//config = require("../config");
var mysql_helper = require('./mysql_helper');
//var csvGenerator = require('./csvGenerator');


var insertmontodb = function (request, myCallback) {
    
     jsonResponse = [{
        status: "",
        data: ""
        }];
    
    var data =request.body.dataofmom;
    var cabnumber=request.body.cabnumber;
    var cabdate =request.body.cabdate;
      
      
      var values ="";
    for(var i=0;i<data.length;i++)
    {   
        var record =data[i];
        if(i==(data.length)-1)
         values = values +"('" +record["Requestor"] + "', '" + record["RefNo"] +"', '" + record["TimeSlot"] + "','no' ,'"+record["Description"]+"','"+record["RequestorPF"]+"','"+record["AssigneePF"]+"','"+record['Category']+"')";
        else
        values = values +"('" +record["Requestor"] + "', '" + record["RefNo"] + "', '" + record["TimeSlot"] +
            "','no', '"+record["Description"]+"','"+record["RequestorPF"]+"','"+record["AssigneePF"]+"','"+record['Category']+"'),";
    }
   // console.log("values  :"+values)
    request.query = "INSERT IGNORE INTO viewtransactions (Requestor, RefNo,TimeSlot,Status,Description,RequestorPF,AssigneePF,Category)  VALUES " +values
    
      console.log("Query  :"+request.query)
     mysql_helper.insertValues(request, function (status, rows) {
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }];
        
       request.query = "INSERT IGNORE INTO cabdetails (cabnumber,cabdate)  VALUES ('"+cabnumber+"','"+cabdate+"')"
       mysql_helper.insertValues(request, function (status, rows) {
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }]; 
              myCallback("success",jsonResponse);  
        } else {
            myCallback("failure");
        }
        });
            
        }
  
     });
}


 



module.exports = {
    mysql_helper: mysql_helper,
    insertmontodb: insertmontodb,
    /*getTransdata: getTransdata,
    removeTransdata:removeTransdata,
    updatetimeslottodb:updatetimeslottodb,
    updateTransdata:updateTransdata,
    insertemailstodb:insertemailstodb*/
};
