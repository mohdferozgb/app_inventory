config = require("../config");
var mysql_helper = require('./mysql_helper');
var email_helper = require('./email_helper');

var sendEmailToAdmins = function () {
    emailAdminVideo();
    emailAdminTele();
    emailAdminWebX();
}

var emailAdminVideo = function () {
    var request = {
        query: "SELECT * FROM video_conf_bookings WHERE session_date = CURDATE()"
    };
    getBookings(request, function (status, rows) {
        //response.json(rows);
        // Preparing mail content
        if (rows.length > 0 && rows[0].status == "success") {
            if (rows[0].data.length != 0) {
                var emailData = {
                    recipient_mail: config.emailVideoConfTeam,
                    sub: 'Video Conference Bookings for today',
                    title: 'Video Conference Bookings for today',
                    message: 'Todays video conference booking are as below',
                    fields: rows
                }
            } else {
                var emailData = {
                    recipient_mail: config.emailVideoConfTeam,
                    sub: 'Video Conference Bookings for today',
                    title: 'Video Conference Bookings for today',
                    message: 'There are no Video Conference bookings for today',
                    fields: rows
                }
            }
        }
        email_helper.sendMailToVideoConfAdmin(emailData);
    });
}

var emailAdminTele = function () {
    var request = {
        query: "SELECT * FROM telepresence_bookings WHERE session_date = CURDATE()"
    };
    getBookings(request, function (status, rows) {
        //response.json(rows);
        //console.log(rows);
        if (rows.length > 0 && rows[0].status == "success") {
            if (rows[0].data.length != 0) {
                // Preparing mail content
                var emailData = {
                    recipient_mail: config.emailTelePresenceTeam,
                    sub: 'Tele Presence Bookings for today',
                    title: 'Tele Presence Bookings for today',
                    message: 'Todays telepresence booking are as below',
                    fields: rows
                }
            } else {
                var emailData = {
                    recipient_mail: config.emailTelePresenceTeam,
                    sub: 'Tele Presence Bookings for today',
                    title: 'Tele Presence Bookings for today',
                    message: 'There are no telepresence bookings for today',
                    fields: rows
                }
            }
        }
        email_helper.sendMailToTeleAdmin(emailData);
    });
}

var emailAdminWebX = function () {
    var request = {
        query: "SELECT * FROM web_conf_bookings WHERE start_date = CURDATE()"
    };
    getBookings(request, function (status, rows) {
        //response.json(rows);
        //console.log(rows);
        // Preparing mail content
        if (rows.length > 0 && rows[0].status == "success") {
            if (rows[0].data.length != 0) {
                var emailData = {
                    recipient_mail: config.emailWebXTeam,
                    sub: 'WebX Booking for today',
                    title: 'WebX Booking for today',
                    message: 'Todays WebX booking are as below',
                    fields: rows
                }
            } else {
                var emailData = {
                    recipient_mail: config.emailWebXTeam,
                    sub: 'WebX Booking for today',
                    title: 'WebX Booking for today',
                    message: 'There are no WebX bookings for today',
                    fields: rows
                }
            }
        }
        email_helper.sendMailToWebexAdmin(emailData);
    });
}

var getBookings = function (request, myCallback) {
    var jsonResponse = [{
        status: "",
        data: []
            }];
    //request.query = "SELECT * FROM video_conf_bookings WHERE session_date = CURDATE()";
    mysql_helper.getValues(request, function (status, rows) {
        console.log("------------------------------123123123 " + status);
        if (status == "success") {
            for (var k in rows) {
                jsonResponse[0].data.push(rows[k]);
            }
            jsonResponse[0].status = status;
            myCallback("success", jsonResponse);
        } else {
            myCallback("failure");
        }
    });
}

module.exports = {
    mysql_helper: mysql_helper,
    sendEmailToAdmins: sendEmailToAdmins
};
