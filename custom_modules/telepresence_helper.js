config = require("../config");
var mysql_helper = require('./mysql_helper');
var email_helper = require('./email_helper');

var insertTele = function (request, myCallback) {
    var jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("Trying to access MySQL Database insertTele " + request.body.pf_number);
    request.query = "INSERT IGNORE INTO tbl_user (pf_number, full_name, email) VALUES ('" + request.body.pf_number + "', '" + request.body.full_name + "', '" + request.body.email + "')";
    mysql_helper.insertValues(request, function (status, rows) {
        if (status == "success") {
            request.query = "INSERT INTO telepresence_bookings (pf_number, session_date, start_time, end_time, duration,  time_range, countries, participants_malaysia, participants_other, exco_members, exco_mem_details, status, date_modified, date_created, modified_by, modified_reason) VALUES ('" + request.body.pf_number + "', '" + request.body.session_date + "', '" + request.body.start_time + "', '" + request.body.end_time + "', '" + request.body.duration + "', '" + request.body.time_range + "', '" + request.body.countries + "', '" + request.body.participants_malaysia + "', '" + request.body.participants_other + "', '" + request.body.exco_members + "', '" + request.body.exco_mem_details + "', 'Confirmed', NOW(), NOW(), '" + request.body.full_name + " (" + request.body.pf_number + ")', 'NA')";
            mysql_helper.insertValues(request, function (status, rows) {
                jsonResponse[0].status = status;
                jsonResponse[0].data = rows;
                if (status == "success") {
                    // Preparing mail content 
                    var emailData = {
                            recipient_mail: request.body.email,
                            sub: 'New Tele Presence Booking',
                            title: 'New Tele Presence Booking',
                            subTitle: 'Thank you for booking with IT4U',
                            message: 'Your Tele Presence Booking Reference Number is ' + config.teleBookingId_Prefix + jsonResponse[0].data.insertId,
                            fields: {
                                "Session Date": request.body.session_date,
                                "Start Time": request.body.start_time,
                                "End Time": request.body.end_time,
                                Duration: request.body.duration,
                                "Countries Involved": request.body.countries,
                                "Exco Members": request.body.exco_mem_details,
                                Participants: request.body.participants_malaysia
                            }
                        }
                        // Sending mail to requester
                    email_helper.sendMailToRequester(emailData);
                    // Sending mail to team
                    emailData.message = 'The following Tele Presence Booking Request is raised. The Booking Request Number is : ' + config.teleBookingId_Prefix + jsonResponse[0].data.insertId;
                    emailData.recipient_mail = config.emailTelePresenceTeam;
                    email_helper.sendMailToTeam(emailData);
                }
                myCallback(status, jsonResponse);
            });
        } else {
            myCallback("failure");
        }
    });
}

var updateTele = function (request, myCallback) {
    console.log("Trying to access MySQL Database updateTele" + request.body.pf_number);
    request.query = "UPDATE telepresence_bookings SET session_date='" + request.body.session_date + "',start_time='" + request.body.start_time + "',end_time='" + request.body.end_time + "',duration='" + request.body.duration + "',time_range='" + request.body.time_range + "',countries='" + request.body.countries + "',participants_malaysia='" + request.body.participants_malaysia + "',participants_other='" + request.body.participants_other + "',exco_members='" + request.body.exco_members + "',exco_mem_details='" + request.body.exco_mem_details + "',status='Confirmed',modified_by='" + request.body.full_name + " (" + request.body.pf_number + ")',date_modified=NOW(),modified_reason='" + request.body.modified_reason + "' WHERE id_booking=" + mysql_helper.mysql.escape(request.body.id_booking);
    mysql_helper.updateValues(request, function (status) {
        if (status == "success") {
            // Preparing mail content
            if (request.body.modified_reason == "NA") {
                var emailMsg = 'Your Tele Presence Booking with Reference Number ' + config.teleBookingId_Prefix + request.body.id_booking + " has been updated.";
            } else {
                var emailMsg = 'Administator has updated your Tele Presence Booking with Reference Number ' + config.teleBookingId_Prefix + request.body.id_booking;
            }
            var emailData = {
                    recipient_mail: request.body.email,
                    sub: 'Tele Presence Booking Updated',
                    title: 'Tele Presence Booking Updated',
                    subTitle: 'Thank you for booking with IT4U',
                    message: emailMsg,
                    fields: {
                        "Session Date": request.body.session_date,
                        "Start Time": request.body.start_time,
                        "End Time": request.body.end_time,
                        Duration: request.body.duration,
                        "Countries Involved": request.body.countries,
                        "Exco Members": request.body.exco_mem_details,
                        Participants: request.body.participants_malaysia,
                        "Modified Reason": request.body.modified_reason
                    }
                }
                // Sending mail to requester
            email_helper.sendMailToRequester(emailData);
            // Sending mail to team
            emailData.message = 'The following Tele Presence Booking Request is updated. The Booking Request Number is : ' + config.teleBookingId_Prefix + request.body.id_booking;
            emailData.recipient_mail = config.emailTelePresenceTeam;
            email_helper.sendMailToTeam(emailData);
        }
        myCallback(status);
    });
}

var cancelTele = function (request, myCallback) {
    console.log("Trying to access MySQL Database cancelTele" + request.body.pf_number);
    request.query = "UPDATE telepresence_bookings SET status='Cancelled',modified_by='" + request.body.full_name + " (" + request.body.pf_number + ")',date_modified=NOW(),modified_reason='" + request.body.modified_reason + "' WHERE id_booking=" + mysql_helper.mysql.escape(request.body.id_booking);
    mysql_helper.updateValues(request, function (status) {
        if (status == "success") {
            // Preparing mail content
            if (request.body.modified_reason == "NA") {
                var emailMsg = 'Your Tele Presence Booking with Reference Number ' + config.teleBookingId_Prefix + request.body.id_booking + " has been Cancelled.";
            } else {
                var emailMsg = 'Administator has cancelled your Booking with Reference Number ' + config.teleBookingId_Prefix + request.body.id_booking;
            }
            var emailData = {
                    recipient_mail: request.body.email,
                    sub: 'Tele Presence Booking Cancelled',
                    title: 'Tele Presence Booking Cancelled',
                    subTitle: 'Thank you for booking with IT4U',
                    message: emailMsg,
                    fields: {
                        "Session Date": request.body.session_date,
                        "Start Time": request.body.start_time,
                        "End Time": request.body.end_time,
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
            emailData.message = 'The following Tele Presence Booking Request is Cancelled. The Booking Request Number is : ' + config.teleBookingId_Prefix + request.body.id_booking;
            emailData.recipient_mail = config.emailTelePresenceTeam;
            email_helper.sendMailToTeam(emailData);
        }
        myCallback(status);
    });
}

//var getTeleDate = function (request, myCallback) {
//    var jsonResponse = [{
//        status: "",
//        data: ""
//    }];
//    console.log("Trying to access MySQL Database getTeleDate" + request.body.pf_number);
//    request.query = "SELECT `start_time`, `end_time` FROM `telepresence_bookings` WHERE session_date = '" + request.query.date + "' and status='Confirmed'";
//    mysql_helper.getValues(request, function (status, rows) {
//        console.log("------------------------------1111111 " + status);
//        if (status == "success") {
//            for (var k in rows) {
//                if (rows.hasOwnProperty(k) && rows[k].hasOwnProperty("id_booking")) {
//                    rows[k]["id_ref_booking"] = rows[k]["pf_number"].slice(-6, -1) + config.webBookingId_Prefix + rows[k]["id_booking"];
//                }
//            }
//            jsonResponse[0].status = status;
//            jsonResponse[0].data = rows;
//            myCallback("success", jsonResponse);
//        } else {
//            myCallback("failure");
//        }
//    });
//}
var getBookedTeleTimes = function (request, myCallback) {
    var jsonResponse = [{
        status: "",
        data: []
    }];
    console.log("Trying to access MySQL Database getBookedTimes " + request.query.session_date);
    request.escaped_date = mysql_helper.mysql.escape(request.query.session_date);
    request.query = "select time_range from telepresence_bookings where session_date = " + request.escaped_date + " and status='Confirmed'";

    mysql_helper.getValues(request, function (status, rows) {
        console.log("------------------------------123123123 " + status);
        if (status == "success") {
            for (var k in rows) {
                console.log(rows);
                if (rows.hasOwnProperty(k) && rows[k].hasOwnProperty("time_range")) {
                    jsonResponse[0].data.push(rows[k]["time_range"]);
                }
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
    insertTele: insertTele,
    updateTele: updateTele,
    cancelTele: cancelTele,
    getBookedTeleTimes: getBookedTeleTimes
};
