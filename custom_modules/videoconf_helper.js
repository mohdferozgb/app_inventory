config = require("../config");
var mysql_helper = require('./mysql_helper');
var email_helper = require('./email_helper');

var insertVideo = function (request, myCallback) {
    var jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("Trying to access MySQL Database insertVideo " + request.body.pf_number);
    request.query = "INSERT IGNORE INTO tbl_user (pf_number, full_name, email) VALUES ('" + request.body.pf_number + "', '" + request.body.full_name + "', '" + request.body.email + "')";
    mysql_helper.insertValues(request, function (status) {
        if (status == "success") {
            request.query = "INSERT INTO video_conf_bookings (pf_number, session_date, start_time, end_time, duration, time_range, location, countries, participants_malaysia, participants_other, exco_members, exco_mem_details, status, date_modified, date_created, modified_by, modified_reason) VALUES ('" + request.body.pf_number + "', '" + request.body.session_date + "', '" + request.body.start_time + "', '" + request.body.end_time + "', '" + request.body.duration + "', '" + request.body.time_range + "', '" + request.body.location + "', '" + request.body.countries + "', '" + request.body.participants_malaysia + "', '" + request.body.participants_other + "', '" + request.body.exco_members + "', '" + request.body.exco_mem_details + "', 'Confirmed', NOW(), NOW(), '" + request.body.full_name + " (" + request.body.pf_number + ")', 'NA')";
            mysql_helper.insertValues(request, function (status, rows) {
                jsonResponse[0].status = status;
                jsonResponse[0].data = rows;
                if (status == "success") {
                    // Preparing mail content
                    var emailData = {
                            recipient_mail: request.body.email,
                            sub: 'New Video Conference Booking',
                            title: 'New Video Conference Booking',
                            subTitle: 'Thank you for booking with IT4U',
                            message: 'Your Video Conference Booking Reference Number is ' + config.videoBookingId_Prefix + jsonResponse[0].data.insertId,
                            fields: {
                                "Session Date": request.body.session_date,
                                "Start Time": request.body.start_time,
                                "End Time": request.body.end_time,
                                Duration: request.body.duration,
                                "Location": request.body.location,
                                "Countries": request.body.countries,
                                "Participants Malaysia": request.body.participants_malaysia,
                                "Other Participants": request.body.participants_other
                            }
                        }
                        // Sending mail to requester
                    email_helper.sendMailToRequester(emailData);
                    // Sending mail to team
                    emailData.message = 'The following Video Conference Booking Request is raised. The Booking Request Number is : ' + config.videoBookingId_Prefix + jsonResponse[0].data.insertId;
                    emailData.recipient_mail = config.emailVideoConfTeam;
                    email_helper.sendMailToTeam(emailData);
                }
                myCallback(status, jsonResponse);
            });
        } else {
            myCallback("failure");
        }
    });
}

var updateVideo = function (request, myCallback) {
    console.log("Trying to access MySQL Database updateVideo" + request.body.pf_number);
    request.query = "UPDATE video_conf_bookings SET session_date='" + request.body.session_date + "',start_time='" + request.body.start_time + "',end_time='" + request.body.end_time + "',duration='" + request.body.duration + "',time_range='" + request.body.time_range + "',location='" + request.body.location + "',countries='" + request.body.countries + "',participants_malaysia='" + request.body.participants_malaysia + "',participants_other='" + request.body.participants_other + "',exco_members='" + request.body.exco_members + "',exco_mem_details='" + request.body.exco_mem_details + "',status='Confirmed',modified_by='" + request.body.full_name + " (" + request.body.pf_number + ")',date_modified=NOW(),modified_reason='" + request.body.modified_reason + "' WHERE id_booking=" + mysql_helper.mysql.escape(request.body.id_booking);
    mysql_helper.updateValues(request, function (status) {
        if (status == "success") {
            // Preparing mail content
            if (request.body.modified_reason == "NA") {
                var emailMsg = 'Your Video Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking + " has been updated.";
            } else {
                var emailMsg = 'Administator has updated your Video Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking;
            }
            var emailData = {
                    recipient_mail: request.body.email,
                    sub: 'Video Conference Booking Updated',
                    title: 'Video Conference Booking Updated',
                    subTitle: 'Thank you for booking with IT4U',
                    message: emailMsg,
                    fields: {
                        "Session Date": request.body.session_date,
                        "Start Time": request.body.start_time,
                        "End Time": request.body.end_time,
                        Duration: request.body.duration,
                        "Location": request.body.location,
                        "Countries": request.body.countries,
                        "Participants Malaysia": request.body.participants_malaysia,
                        "Other Participants": request.body.participants_other,
                        "Modified Reason": request.body.modified_reason
                    }
                }
                // Sending mail to requester
            email_helper.sendMailToRequester(emailData);
            // Sending mail to team
            emailData.message = 'The following Video Conference Booking Request is updated. The Booking Request Number is : ' + config.videoBookingId_Prefix + request.body.id_booking;
            emailData.recipient_mail = config.emailVideoConfTeam;
            email_helper.sendMailToTeam(emailData);
        }
        myCallback(status);
    });
}

var cancelVideo = function (request, myCallback) {
    console.log("Trying to access MySQL Database cancelVideo" + request.body.pf_number);
    request.query = "UPDATE video_conf_bookings SET status='Cancelled',modified_by='" + request.body.full_name + " (" + request.body.pf_number + ")',date_modified=NOW(),modified_reason='" + request.body.modified_reason + "' WHERE id_booking=" + mysql_helper.mysql.escape(request.body.id_booking);
    mysql_helper.updateValues(request, function (status) {
        if (status == "success") {
            // Preparing mail content
            if (request.body.modified_reason == "NA") {
                var emailMsg = 'Your Video Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking + " has been Cancelled.";
            } else {
                var emailMsg = 'Administator has cancelled your Video Conference Booking with Reference Number ' + config.videoBookingId_Prefix + request.body.id_booking;
            }
            var emailData = {
                    recipient_mail: request.body.email,
                    sub: 'Video Conference Booking Cancelled',
                    title: 'Video Conference Booking Cancelled',
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
            emailData.message = 'The following Video Conference Booking Request is Cancelled. The Booking Request Number is : ' + config.videoBookingId_Prefix + request.body.id_booking;
            emailData.recipient_mail = config.emailVideoConfTeam;
            email_helper.sendMailToTeam(emailData);
        }
        myCallback(status);
    });
}

var getBookedVideoTimes = function (request, myCallback) {
    var jsonResponse = [{
        status: "",
        data: []
    }];
    console.log("Trying to access MySQL Database getBookedTimes " + request.query.location + " and " + request.query.session_date);
    request.escaped_date = mysql_helper.mysql.escape(request.query.session_date);
    request.escaped_loc = mysql_helper.mysql.escape(request.query.location);
    request.query = "select time_range from video_conf_bookings where session_date = " + request.escaped_date + " and location =" + request.escaped_loc + " and status='Confirmed'";

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
    insertVideo: insertVideo,
    updateVideo: updateVideo,
    cancelVideo: cancelVideo,
    getBookedVideoTimes: getBookedVideoTimes
};
