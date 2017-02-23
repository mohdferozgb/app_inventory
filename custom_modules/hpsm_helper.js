config = require("../config");
var mysql_helper = require('./mysql_helper');
var sql = require("seriate");
var getHPSM_tickets = function (request, myCallback) {



    var sess_data = JSON.parse(JSON.stringify(request.session.user_details));
    var user_Data = [{
        'status': 'success',
        'name': sess_data[0].name,
        'mail': sess_data[0].mail,
        'isadmin': sess_data[0].isadmin,
        'pfid': sess_data[0].pfid
                        }];
    var request_id = request.query.id;
    sql.execute({
        query: "SELECT  TOP 20 [INCIDENT_ID], [OPEN_TIME], [TITLE], [DESCRIPTION], [AFFECTED_ITEM], [INITIAL_IMPACT], [SEVERITY], [OPEN] FROM [SM9].[dbo].[INCIDENTSM1] where CONTACT_NAME='00078727' and incidentsm1.category !='Human Resources' AND [OPEN] in ('Closed','Resolved','Open - Linked','Open - Idle') order by OPEN_TIME DESC"
    }).then(function (results) {

        var jsonResponse1 = results

        request.query = "select * from infra_service_request where pf_number='" + sess_data[0].pfid + "'and (status= '0' or status='2')";
        mysql_helper.getValues(request, function (status, rows) {
            if (status == "success") {
                var jsonResponse = [{
                    status: "",
                    data: []
    }];
                for (var k in rows) {
                    if (rows.hasOwnProperty(k) && rows[k].hasOwnProperty("request_temp_id")) {

                        if (rows[k]["request_temp_id"] < 10) {
                            var number = '0' + rows[k]["request_temp_id"];
                        } else {
                            number = rows[k]["request_temp_id"];
                        }
                        rows[k]["request_temp_id"] = config.Servicerequest_Prefix + number;

                    }
                    jsonResponse[0].data.push(rows[k]);
                }
            }

            var jsonResponse2 = rows
            jsonResponse1 = jsonResponse2.concat(jsonResponse1);
            request.query = "select * from infra_service_request where approval_pf_number='" + sess_data[0].pfid + "'and status='0'";
            mysql_helper.getValues(request, function (status, rows) {

                var notif_msgs = rows
                jsonResponse1 = [{
                    'userdata': user_Data,
                    'hpsm_tickets': jsonResponse1,
                    'notifications': notif_msgs
                    }];

                //    console.log("REsponse: " + jsonResponse1);

                myCallback("success", jsonResponse1);
            });
        });
        //  });

    }, function (err) {
        console.log("Something bad happened:", err);
    });
}

module.exports = {
    mysql_helper: mysql_helper,
    getHPSM_tickets: getHPSM_tickets
};
