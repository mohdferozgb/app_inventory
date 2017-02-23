config = require("../config");
var mysql_helper = require('./mysql_helper');
var email_helper = require('./email_helper');

var insertWeb = function (request, myCallback) {
    var jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("Trying to access MySQL Database insertWeb " + request.body.pf_number);
    request.query = "INSERT IGNORE INTO tbl_user (pf_number, full_name, email) VALUES ('" + request.body.pf_number + "', '" + request.body.full_name + "', '" + request.body.email + "')";
    mysql_helper.insertValues(request, function (status, rows) {
        //console.log("------------------------------1111111 " + status);
        if (status == "success") {
            request.query = "SELECT * FROM webx_ids WHERE isAvailable = true";
            mysql_helper.getValues(request, function (status, rows) {
                //console.log("------------------------------22222222 " + status);
                if (status == "success") {
                    var webxID = "";
                    for (var k in rows) {
                        if (rows.hasOwnProperty(k) && rows[k].hasOwnProperty("id_value") && rows[k].hasOwnProperty("isAvailable")) {
                            if (rows[k]["isAvailable"]) {
                                var webxID = rows[k]["id_value"];
                                break;
                            }
                        }
                    }
                    if (null !== webxID && webxID !== undefined && webxID !== "") {
                        request.query = "UPDATE webx_ids SET isAvailable = false, last_booked = '" + request.body.end_date + "' WHERE id_value = '" + webxID + "'";
                        mysql_helper.updateValues(request, function (status, rows) {
                            //console.log("------------------------------33333333 " + status);
                            if (status == "success") {
                                request.query = "INSERT INTO web_conf_bookings (pf_number, start_date, end_date, duration, countries, countries_other, webx_id, status, date_modified, date_created, modified_by, modified_reason) VALUES ('" + request.body.pf_number + "', '" + request.body.start_date + "', '" + request.body.end_date + "', '" + request.body.duration + "', '" + request.body.countries + "', '" + request.body.countries_other + "', '" + webxID + "', 'Confirmed', NOW(), NOW(), '" + request.body.full_name + " (" + request.body.pf_number + ")', 'NA')";
                                mysql_helper.insertValues(request, function (status, rows) {
                                    jsonResponse[0].status = status;
                                    jsonResponse[0].data = rows;
                                    if (status == "success") {
                                        // Preparing mail content
                                        var emailData = {
                                                recipient_mail: request.body.email,
                                                sub: 'New Web Conference Booking',
                                                title: 'New Web Conference Booking',
                                                subTitle: 'Thank you for booking with IT4U',
                                                message: 'Your Web Conference Booking Reference Number is ' + request.body.pf_number.slice(-6, -1) + config.videoBookingId_Prefix + jsonResponse[0].data.insertId,
                                                fields: {
                                                    "Start Date": request.body.start_date,
                                                    "End Date": request.body.end_date,
                                                    "Duration": request.body.duration,
                                                    Countries: request.body.countries,
                                                    "Other Countries": request.body.countries_other
                                                }
                                            }
                                            // Sending mail to requester
                                        email_helper.sendMailToRequester(emailData);
                                        // Sending mail to team
                                        emailData.message = 'The following Web Conference Booking Request is raised. The Booking Request Number is : ' + request.body.pf_number.slice(-6, -1) + config.videoBookingId_Prefix + jsonResponse[0].data.insertId;
                                        emailData.recipient_mail = config.emailVideoConfTeam;
                                        email_helper.sendMailToTeam(emailData);

                                        myCallback(status, jsonResponse);
                                    } else {
                                        request.query = "UPDATE webx_ids SET isAvailable = true WHERE id_value = '" + webxID + "'";
                                        mysql_helper.updateValues(request, function (status) {
                                            //console.log("------------------------------55555555 " + status);
                                            myCallback("failure"); //sending failure in case of success as well as failure
                                        });
                                    }
                                });
                            } else {
                                myCallback("failure");
                            }
                        });
                    } else {
                        myCallback("No Available IDs Found");
                    }

                } else {
                    myCallback("failure");
                }
            });
        } else {
            myCallback("failure");
        }
    });
}

var updateWeb = function (request, myCallback) {
    console.log("Trying to access MySQL Database updateWeb" + request.body.pf_number);
    request.query = "UPDATE web_conf_bookings SET start_date='" + request.body.start_date + "',end_date='" + request.body.end_date + "',duration='" + request.body.duration + "',countries='" + request.body.countries + "',countries_other='" + request.body.countries_other + "',status='Confirmed',modified_by='" + request.body.full_name + " (" + request.body.pf_number + ")',date_modified=NOW(),modified_reason='" + request.body.modified_reason + "' WHERE id_booking=" + mysql_helper.mysql.escape(request.body.id_booking);
    mysql_helper.updateValues(request, function (status) {
        //console.log("------------------------------22222222 " + status);
        request.query = "UPDATE webx_ids SET last_booked = '" + request.body.end_date + "' WHERE id_value = " + mysql_helper.mysql.escape(request.body.webx_id);
        mysql_helper.updateValues(request, function (status, rows) {
            //sendEmail(request.body, 'mdmansoor.k@maybank.com.my', 'Test');
            if (status == "success") {
                // Preparing mail content
                if (request.body.modified_reason == "NA") {
                    var emailMsg = 'Your Web Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking + " has been updated.";
                } else {
                    var emailMsg = 'Administrator has updated your Web Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking;
                }
                var emailData = {
                        recipient_mail: request.body.email,
                        sub: 'Web Conference Booking Updated',
                        title: 'Web Conference Booking Updated',
                        subTitle: 'Thank you for booking with IT4U',
                        message: emailMsg,
                        fields: {
                            "Start Date": request.body.start_date,
                            "End Date": request.body.end_date,
                            "Duration": request.body.duration,
                            Countries: request.body.countries,
                            "Other Countries": request.body.countries_other,
                            "Modified Reason": request.body.modified_reason
                        }
                    }
                    // Sending mail to requester
                email_helper.sendMailToRequester(emailData);
                // Sending mail to team
                emailData.message = 'The following Web Conference Booking Request is updated. The Booking Request Number is : ' + config.videoBookingId_Prefix + request.body.id_booking;
                emailData.recipient_mail = config.emailVideoConfTeam;
                email_helper.sendMailToTeam(emailData);
            }
            myCallback(status);
        });

    });
}

var cancelWeb = function (request, myCallback) {
    console.log("Trying to access MySQL Database cancelWeb" + request.body.pf_number);
    request.query = "UPDATE web_conf_bookings SET status='Cancelled',modified_by='" + request.body.full_name + " (" + request.body.pf_number + ")',date_modified=NOW(),modified_reason='" + request.body.modified_reason + "' WHERE id_booking=" + mysql_helper.mysql.escape(request.body.id_booking);
    mysql_helper.updateValues(request, function (status) {
        //console.log("------------------------------222222 " + status);
        if (status == "success") {
            request.query = "UPDATE webx_ids SET isAvailable = true WHERE id_value = '" + request.body.webx_id + "'";
            mysql_helper.updateValues(request, function (status) {
                //console.log("------------------------------12121212 " + status);
                if (status == "success") {
                    // Preparing mail content
                    if (request.body.modified_reason == "NA") {
                        var emailMsg = 'Your Web Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking + " has been Cancelled.";
                    } else {
                        var emailMsg = 'Administrator has cancelled your Web Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking;
                    }
                    var emailData = {
                            recipient_mail: request.body.email,
                            sub: 'Web Conference Booking Cancelled',
                            title: 'Web Conference Booking Cancelled',
                            subTitle: 'Thank you for booking with IT4U',
                            message: emailMsg,
                            fields: {
                                "Start Date": request.body.start_date,
                                "End Date": request.body.end_date,
                                "Duration": request.body.duration,
                                "Cancellation Reason": request.body.modified_reason
                                    //Duration: request.body.duration,
                                    //"Countries Involved": request.body.countries,
                                    //"Exco Members": request.body.exco_mem_details,
                                    //Participants: request.body.participants_malaysia
                            }
                        }
                        // Sending mail to requester
                    email_helper.sendMailToRequester(emailData);
                    // Sending mail to team
                    emailData.message = 'The following Web Conference Booking Request is Cancelled. The Booking Request Number is : ' + config.videoBookingId_Prefix + request.body.id_booking;
                    emailData.recipient_mail = config.emailVideoConfTeam;
                    email_helper.sendMailToTeam(emailData);
                }
                myCallback(status);
            });
        } else {
            myCallback("failure");
        }
    });
}


module.exports = {
    mysql_helper: mysql_helper,
    insertWeb: insertWeb,
    updateWeb: updateWeb,
    cancelWeb: cancelWeb
};
