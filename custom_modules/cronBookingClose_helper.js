config = require("../config");
var mysql_helper = require('./mysql_helper');
var email_helper = require('./email_helper');
var path = require('path');
var fs = require('fs-extra');

var closeAllBookings = function () {
    closeBookings();
}

var closeBookings = function () {
    // Close all video conference past today --------
    var request = {
        query: "UPDATE video_conf_bookings SET status = 'Closed' WHERE session_date < CURDATE() AND status = 'Confirmed'"
    };
    mysql_helper.updateValues(request, function (status) {
        // Close all video Telepresence past today --------
        request.query = "UPDATE telepresence_bookings SET status = 'Closed' WHERE session_date < CURDATE() AND status = 'Confirmed'";
        mysql_helper.updateValues(request, function (status) {
            // Close all video WebEX past today --------
            request.query = "UPDATE web_conf_bookings SET status = 'Closed' WHERE end_date < CURDATE() AND status = 'Confirmed'";
            mysql_helper.updateValues(request, function (status) {
                // Clear all unused WebEX Id's --------
                request.query = "UPDATE webx_ids SET isAvailable = true WHERE last_booked < CURDATE()";
                mysql_helper.updateValues(request, function (status) {
                    console.log("All previous Bookings Data has been set to Closed and webX id's cleared.");
                    // Select unused WebEX Id's and send email --------
                    request.query = "select id_value from  webx_ids where isAvailable = true";
                    mysql_helper.getValues(request, function (status, rows) {
                        var jsonResponse = [{
                            status: "success",
                            data: rows
                        }];
                        console.log("Free booking ids " + JSON.stringify(jsonResponse));
                        sendAvailableIdEmail(jsonResponse);
                        deleteBookings();
                    });
                });
            });
        });
    });
}

var deleteBookings = function () {
    // Delete all video conference past 1 year --------
    var request = {
        query: "DELETE FROM video_conf_bookings WHERE session_date < DATE_SUB(NOW(), INTERVAL 12 MONTH)"
    };
    mysql_helper.deleteValues(request, function (status) {
        // Delete all video Telepresence past 1 year --------
        request.query = "DELETE FROM telepresence_bookings WHERE session_date < DATE_SUB(NOW(), INTERVAL 12 MONTH)";
        mysql_helper.deleteValues(request, function (status) {
            // Delete all video WebEX past 1 year --------
            request.query = "DELETE FROM web_conf_bookings WHERE end_date < DATE_SUB(NOW(), INTERVAL 12 MONTH)";
            mysql_helper.deleteValues(request, function (status) {
                console.log("All Bookings that are more than 1 year old has been deleted.");
                deleteUploadFiles();
                //deleteServiceBookings();
            });
        });
    });
}

var deleteUploadFiles = function () {
    // Delete all Files past 1 year --------
    var request = {
        query: "select attachments FROM infra_service_request WHERE requested_date < DATE_SUB(NOW(), INTERVAL 12 MONTH)"
    };
    mysql_helper.getValues(request, function (status, rows) {
        for (var i = 0; i < rows.length; i++) {
            var tempArray = rows[i].attachments.split(",")
            for (var j = 0; j < tempArray.length; j++) {
                if (tempArray[j] != "") {
                    fs.remove(path.resolve('uploads/' + tempArray[j]), function (err) {
                        if (err) return console.error(err)
                        console.log("del success ----")
                        deleteServiceBookings();
                    })
                }
            }
        }
    });
}

var deleteServiceBookings = function () {
    // Delete all Service Requests past 1 year --------
    var request = {
        query: "DELETE FROM infra_service_request WHERE requested_date < DATE_SUB(NOW(), INTERVAL 12 MONTH)"
    };
    mysql_helper.deleteValues(request, function (status) {
        // Delete all Rejected Service Requests past 15 days --------
        var request = {
            query: "DELETE FROM infra_service_request WHERE status = 2 AND approved_date < DATE_SUB(NOW(), INTERVAL 15 DAY)"
        };
        mysql_helper.deleteValues(request, function (status) {

        });
    });
}

var sendAvailableIdEmail = function (rows) {
    // Preparing mail content
    if (rows[0].status == "success") {
        if (rows[0].data.length != 0) {
            var emailData = {
                recipient_mail: config.emailWebXTeam,
                sub: 'List of available WebX id\'s',
                title: 'List of available WebX id\'s',
                message: 'Available WebX id\'s are',
                fields: rows
            }
        } else {
            var emailData = {
                recipient_mail: config.emailWebXTeam,
                sub: 'List of available WebX id\'s',
                title: 'List of available WebX id\'s',
                message: 'There are no WebX id\'s Available',
                fields: rows
            }
        }
    }
    email_helper.sendMailToWebexAdminWithAvailableIds(emailData);
}

module.exports = {
    mysql_helper: mysql_helper,
    closeAllBookings: closeAllBookings
};
