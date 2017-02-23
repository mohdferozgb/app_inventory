//----------------Email---------------------//
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var config = require("./../config");


//--------Send Mail to requester---------//
var sendMailToRequester = function (emailData) {

    // Composing message
    var message = team_email_template_header;
    message += composeTitle(emailData.title);
    message += composeSubTitle(emailData.subTitle);
    message += composeMessage(emailData.message);
    message += composeHtmlTable(emailData.fields);
    message += email_template_footer_mss;
    sendMail(emailData.recipient_mail, emailData.sub, message, emailData.attachments);

}

//--------Send Mail to bokking team---------//
var sendMailToTeam = function (emailData) {

    // Composing message
    var message = team_email_template_header;
    message += composeTitle(emailData.title);
    message += composeMessage(emailData.message);
    message += composeHtmlTable(emailData.fields);
    message += team_email_template_footer;

    sendMail(emailData.recipient_mail, emailData.sub, message, emailData.attachments);
}

//--------Send Mail to video conf admin---------//
var sendMailToVideoConfAdmin = function (emailData) {

    // Composing message
    var message = team_email_template_header;
    message += composeTitle(emailData.title);
    message += composeMessage(emailData.message);
    if (emailData.fields[0].data.length > 0)
        message += composeVideoConfAdminHtmlTable(emailData.fields);
    message += team_email_template_footer;

    sendMail(emailData.recipient_mail, emailData.sub, message, emailData.attachments);
}

//--------Send Mail to webex admin---------//
var sendMailToWebexAdmin = function (emailData) {

    // Composing message
    var message = team_email_template_header;
    message += composeTitle(emailData.title);
    message += composeMessage(emailData.message);
    if (emailData.fields[0].data.length > 0)
        message += composeWebexAdminHtmlTable(emailData.fields);
    message += team_email_template_footer;

    sendMail(emailData.recipient_mail, emailData.sub, message, emailData.attachments);
}

//--------Send Mail to webex admin---------//
var sendMailToTeleAdmin = function (emailData) {

    // Composing message
    var message = team_email_template_header;
    message += composeTitle(emailData.title);
    message += composeMessage(emailData.message);
    if (emailData.fields[0].data.length > 0)
        message += composeTeleAdminHtmlTable(emailData.fields);
    message += team_email_template_footer;

    sendMail(emailData.recipient_mail, emailData.sub, message, emailData.attachments);
}

//--------Send Mail to webex admin with available webex id's---------//
var sendMailToWebexAdminWithAvailableIds = function (emailData) {

    // Composing message
    var message = team_email_template_header;
    message += composeTitle(emailData.title);
    message += composeMessage(emailData.message);
    if (emailData.fields[0].data.length > 0)
        message += composeWebexAdminAvailableIdsHtmlTable(emailData.fields);
    message += team_email_template_footer;

    sendMail(emailData.recipient_mail, emailData.sub, message, emailData.attachments);
}



//-------- Send  Mail ---------//
var sendMail = function (to_addr, subject, message, attachments) {
   // console.log("sending email to " + to_addr)
    var transporter = nodemailer.createTransport(smtpTransport({
        host: config.smtp_server_ip,
        port: config.smtp_server_port,
        tls: {
            rejectUnauthorized: false
        }
    }));

    //attachments
    var emailAttachment = [];
    if (attachments != undefined) {

        var attchmentArr = [];
         var obj = {};
        attchmentArr = attachments.split(",")
        if(attachments.indexOf("Report") >-1)
        {
           
            obj['path'] = attachments;
            emailAttachment.push(obj);
            
        }else{
            for (var i = 0; i < attchmentArr.length; i++) {
           
            obj['filename'] = attchmentArr[i].split("#~#")[1];
            obj['path'] = './uploads/' + attchmentArr[i];
            emailAttachment.push(obj);
        }
        }
        
    }

    var mailOptions = {
        from: 'change_management@maybank.com.my',
        to: to_addr,
        subject: subject,
        html: message,
        attachments: emailAttachment
    };

    console.log("mail options :"+mailOptions);

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
}

var composeEmail = function (receiverType, mailContent) {
    composeTable(mailContent);
}


//-----------Composing html table form json-------------//
var composeHtmlTable = function (tableContent) {

    var message = '<style>tr.d0 td{background-color:#E8E8E8;color:black;padding:5px;}tr.d1 td{background-color:#C0C0C0;color:black;padding:5px;</style><br><table align="center">';

    var row = 0;
    for (var key in tableContent) {
        if (tableContent.hasOwnProperty(key)) {
            if (row == 0) {
                message += '<tr class="d0"><td>';
                row = 1;
            } else {
                message += '<tr class="d1"><td>';
                row = 0;
            }
            message += key + '</td><td>' + tableContent[key] + '</td></tr>';
        }
    }
    message += '</table>';
    //console.log("-------- " + message);
    return message;
}


var composeVideoConfAdminHtmlTable = function (tableContent) {

    var message = "<style>tr.head td{background-color:#ffeebe;color:black;padding:10px;font-weight:bold;font-size:16px;}  tr.d0 td{color:black;padding:10px;width:18%;border:1px solid #ffeebe;} tr.d1 td{color:black;padding:10px;width:18%;border:1px solid #ffeebe}</style><br><center><div style='width:600px;background-color:#fff;margin:0 auto'><table style='width:60%;border:1px solid #C0C0C0;background-color:#FFF' cellspacing='0px' cellpadding='0px'><tr class='head'><td>PF.No.</td><td>Date</td><td>Start Time</td><td>End Time</td><td>Location</td></tr>";

    for (i = 0; i < tableContent[0].data.length; i++) {
        //console.log("Data " + i + " " + tableContent[0].data[i].location);
        if (i % 2 == 0) {
            message += '<tr class="d0" ><td>';
        } else {
            message += '<tr class="d1" ><td>';
        }
        message += tableContent[0].data[i].pf_number + '</td><td>' + tableContent[0].data[i].session_date + '</td><td>' + tableContent[0].data[i].start_time + '</td><td>' + tableContent[0].data[i].end_time + '</td><td style="width:28%;">' + tableContent[0].data[i].location + '</td></tr>'

    }

    message += '</table></div></center>';
    //console.log("-------- " + message);
    return message;
}

var composeWebexAdminHtmlTable = function (tableContent) {

    var message = "<style>tr.head td{background-color:#ffeebe;color:black;padding:10px;font-weight:bold;font-size:16px;}  tr.d0 td{color:black;padding:10px;width:25%;border:1px solid #ffeebe;} tr.d1 td{color:black;padding:10px;width:25%;border:1px solid #ffeebe}</style><br><center><div style='width:600px;background-color:#fff;margin:0 auto'><table style='width:60%;border:1px solid #C0C0C0;background-color:#FFF' cellspacing='0px' cellpadding='0px'><tr class='head'><td>PF.No.</td><td>Start date</td><td>End date</td><td>Webex id</td></tr>";

    for (i = 0; i < tableContent[0].data.length; i++) {
        console.log("Data " + i + " " + tableContent[0].data[i].location);
        if (i % 2 == 0) {
            message += '<tr class="d0" ><td>';
        } else {
            message += '<tr class="d1" ><td>';
        }
        message += tableContent[0].data[i].pf_number + '</td><td>' + tableContent[0].data[i].start_date + '</td><td>' + tableContent[0].data[i].end_date + '</td><td style="width:40%;">' + tableContent[0].data[i].webx_id + '</td></tr>'

    }

    message += '</table></div></center>';
    //console.log("-------- " + message);
    return message;
}

var composeWebexAdminAvailableIdsHtmlTable = function (tableContent) {

    var message = "<style>tr.head td{background-color:#ffeebe;color:black;padding:10px;font-weight:bold;font-size:16px;}  tr.d0 td{color:black;padding:10px;width:25%;border:1px solid #ffeebe;} tr.d1 td{color:black;padding:10px;width:25%;border:1px solid #ffeebe}</style><br><center><div style='width:600px;background-color:#fff;margin:0 auto'><table style='width:60%;border:1px solid #C0C0C0;background-color:#FFF' cellspacing='0px' cellpadding='0px'><tr class='head'><td>Sl No.</td><td>Available id's</td></tr>";

    for (i = 0; i < tableContent[0].data.length; i++) {
        console.log("Data " + i + " " + tableContent[0].data[i].location);
        if (i % 2 == 0) {
            message += '<tr class="d0" ><td style="width:20%;">';
        } else {
            message += '<tr class="d1" ><td style="width:20%;">';
        }
        message += (i + 1) + '</td><td>' + tableContent[0].data[i].id_value + '</td></tr>';

    }

    message += '</table></div></center>';
    //console.log("-------- " + message);
    return message;
}

var composeTeleAdminHtmlTable = function (tableContent) {

    var message = "<style>tr.head td{background-color:#ffeebe;color:black;padding:10px;font-weight:bold;font-size:16px;}  tr.d0 td{color:black;padding:10px;width:25%;border:1px solid #ffeebe;} tr.d1 td{color:black;padding:10px;width:25%;border:1px solid #ffeebe}</style><br><center><div style='width:600px;background-color:#fff;margin:0 auto'><table style='width:60%;border:1px solid #C0C0C0;background-color:#FFF' cellspacing='0px' cellpadding='0px'><tr class='head'><td>PF.No.</td><td>Start time</td><td>End time</td><td>Countires</td></tr>";

    for (i = 0; i < tableContent[0].data.length; i++) {
        console.log("Data " + i + " " + tableContent[0].data[i].location);
        if (i % 2 == 0) {
            message += '<tr class="d0" ><td>';
        } else {
            message += '<tr class="d1" ><td>';
        }
        message += tableContent[0].data[i].pf_number + '</td><td>' + tableContent[0].data[i].start_time + '</td><td>' + tableContent[0].data[i].end_time + '</td><td style="width:40%;">' + tableContent[0].data[i].countries + '</td></tr>'

    }

    message += '</table></div></center>';
    //console.log("-------- " + message);
    return message;
}

var composeTitle = function (title) {
    return '<br><h2 style="font-style: normal;font-weight: 700;Margin-bottom: 0;Margin-top: 0;font-size: 24px;line-height: 32px;color: #44a8c7;text-align: center">' + title + '</h2>';
}
var composeSubTitle = function (subTitle) {
    return '<br><center><strong><span style="font-size: 20px;">' + subTitle + '</span></strong></center>';
}

var composeMessage = function (message) {
    return '<br><center><strong><span style="font-size: 18px;">' + message + '</span></strong></center>';
}

//-----------html template portions------------//
var team_email_template_header = '<center><a href="" class="logo" style="body{background-color:#f6f6f6;font-family:calibri} ;position: relative;z-index: 999999;left: -9px; top:0px;"><img src="' + config.image_server_url + 'assets/img/email_header.png" style="width: 10%; border:0px;"></a></center>';

var team_email_template_footer = '<center><br><a href="" class="logo" style="position: relative;z-index: 999999;left: -9px; top:0px;"><img src="' + config.image_server_url + 'assets/img/footer_email.png" style="width: 100%; border:0px;"></a></center>';

var email_template_header = '<center><a href="" class="logo" style="position: relative;z-index: 999999;left: -9px; top:0px;"><img src="' + config.image_server_url + 'assets/img/email_header.png" style="width: 10%; border:0px;"></a></center>';

var email_template_footer_mss = '<br><center><span style="font-size: 20px;">For any correspondance please contact <a href="mailto:mss.virtualmeeting@maybank.com.my">MSS Booking Desk.</a> Please quote your booking number.</span><br><br><strong><span style="font-size: 20px;">Note: The booking is currently pending confirmation based on availability</span></strong><br><br><a href="" class="logo" style="position: relative;z-index: 999999;left: -9px; top:0px;"><img src="' + config.image_server_url + 'assets/img/footer_email.png" style="width: 100%; border:0px;"></a></center>';

//var data = {
//    name: 'mansoor',
//    mail: 'sample@maukva.com',
//    id: 'id'
//};
//composeEmail('user', data);
//sendMail('mdmansoor.k@maybank.com', 'hello', 'Maybank');


module.exports = {
    sendMailToRequester: sendMailToRequester,
    sendMailToTeam: sendMailToTeam,
    sendMail: sendMail,
    sendMailToVideoConfAdmin: sendMailToVideoConfAdmin,
    sendMailToWebexAdmin: sendMailToWebexAdmin,
    sendMailToTeleAdmin: sendMailToTeleAdmin,
    sendMailToWebexAdminWithAvailableIds: sendMailToWebexAdminWithAvailableIds
};
