var emailHelper = require('./email_helper');
var json2csv = require('json2csv');
var fs = require('fs');
config = require("../config");

var csvGenerator = function (file, fields,fieldNames, jsonData) {
    
    var jsnData = [] 
  //  console.log("fields***"+fields)  
    for(var k in jsonData)
    {
        jsnData.push(jsonData[k])
    }
        
  var csv = json2csv({ data: jsnData,fields:fields,fieldNames:fieldNames});
  fs.writeFile('Reports/'+file+'.csv', csv, function(err,json) {
  if (err)
      throw err;
    else{
        console.log( "csv success :"+JSON.stringify(json))
        var message ="Report for the month of "+file;
        var subject  ="Report for the month of "+file;
        var  to_addr="cheravala.ma@maybank.com"
       emailHelper.sendMail(to_addr, subject, message,'Reports/'+file+'.csv');
    }
  console.log('file saved');
});
};

module.exports = {
	csvGenerator: csvGenerator,
};
