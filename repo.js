var express = require('express');
var mysql   = require('mysql');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var cors = require('cors');
var mysql_helper = require('./custom_modules/mysql_helper');
var bookigmomhelper= require("./custom_modules/booking_mom_helper.js")
var session = require('express-session');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        httpOnly: false,
        expires: false
    }
}));
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use("/", express.static(__dirname + '/'));
//app.use('/node_modules',  express.static(__dirname + 'node_modules'));

app.use('/client',  express.static(__dirname + 'client'));



app.get('/',function(req,res){
    res.sendFile('index.html',{'root': __dirname + '/'});
})


var getdbData = '';

 


app.get('/getHome', urlencodedParser, function (req, res) {

    console.log("admin:"+sess.isadmin);
     //req.query = "select * from employees"
     if(sess && sess.isadmin)
      req.query = "select * from employees"
      else{
          req.query = "select id,app_id, app_name, app_description,business_sect,business_subsect,business_owner,it_dept,it_owner,domain_lead,ea_domain,business_capability,business_criticality,avail_requirements,country_usage,year_implemented,age_of_app,message_format,app_plan,appsoft_type,app_server,integrattion_type,appsoft_prodname,prog_lang,report_tool,app_architecture,ntier_app_arch,hosting_location,virtual_environ,dr_available,app_hardware,app_os_family,app_os,db,db_hardware,db_os,client_hardware,client_os,nw_accessiblity,network,no_inter_otherapp,depinteg_core,totres_supapp,no_of_users,types_of_users,no_of_licenses,type_of_license,monthly_trans,sw_yearly_cost,half_yearly_cost,telco_yearly_cost,vendor_supp_cost,proj_benefits,yearly_support_cost,vend_supp_app,isapp_still_vend,vend_hav_locoff,obs_tech_supp_sol,obsolete_tech,obs_tech_remarks,curr_supp_insource,curr_supp_osource,curr_supp_joint,curr_supp_remarks,curr_enha_insource,curr_enha_osource,curr_enha_joint,curr_enha_remarks,source_avail_yes,source_avail_no,source_ifno_poss,source_availremark,rational_plan,rational_remarks,rational_genremark,enduser_comp_app,msa_worry_bucket,sustain_assessrisk,msa_app,itb_techrisk_involve,business_platform,prob_apps,blueprint_critical from employees where isApproved=1";
          
      }
     
       mysql_helper.getValues(req, function (status, rows) {
           console.log(rows)
          getdbData = JSON.stringify(rows);
        if (status == "success") {
      
        }
  
     });
    res.send(getdbData);
});


app.post('/insertApp', urlencodedParser, function (req, res) {

        
    var data  = req.body;
     jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("body:"+data);
    
    
    
    //return;
    
   // connection.query = "INSERT IGNORE INTO employees (id, name,location,Gender,Age)  VALUES " +data
     
     req.query = "INSERT INTO employees (app_id, app_name, app_description,business_sect,business_subsect,business_owner,it_dept,it_owner,domain_lead,ea_domain,business_capability,business_criticality,avail_requirements,country_usage,year_implemented,age_of_app,message_format,app_plan,appsoft_type,app_server,integrattion_type,appsoft_prodname,prog_lang,report_tool,app_architecture,ntier_app_arch,hosting_location,virtual_environ,dr_available,app_hardware,app_os_family,app_os,db,db_hardware,dbos_sys_family,db_os,client_hardware,client_os,nw_accessiblity,network,no_inter_otherapp,depinteg_core,totres_supapp,no_of_users,types_of_users,no_of_licenses,type_of_license,monthly_trans,sw_yearly_cost,half_yearly_cost,telco_yearly_cost,vendor_supp_cost,proj_benefits,yearly_support_cost,vend_supp_app,isapp_still_vend,vend_hav_locoff,obs_tech_supp_sol,obsolete_tech,obs_tech_remarks,curr_supp_insource,curr_supp_osource,curr_supp_joint,curr_supp_remarks,curr_enha_insource,curr_enha_osource,curr_enha_joint,curr_enha_remarks,source_avail_yes,source_avail_no,source_ifno_poss,source_availremark,rational_plan,rational_remarks,rational_genremark,enduser_comp_app,msa_worry_bucket,sustain_assessrisk,msa_app,itb_techrisk_involve,business_platform,prob_apps,blueprint_critical,isApproved) VALUES ('"+data.app_id+"','"+data.app_name+"','"+data.app_description+"','"+data.	business_sect+"','"+data.business_subsect+"','"+data.business_owner+"','"+data.	it_dept+"','"+data.	it_owner+"','"+data.	domain_lead+"','"+data.ea_domain+"','"+data.business_capability+"','"+data.business_criticality+"','"+data.avail_requirements+"','"+data.country_usage+"',"+parseInt(data.year_implemented)+","+parseInt(data.age_of_app)+",'"+data.message_format+"','"+data.app_plan+"','"+data.appsoft_type+"','"+data.app_server+"','"+data.integrattion_type+"','"+data.appsoft_prodname+"','"+data.	prog_lang+"','"+data.report_tool+"','"+data.app_architecture+"','"+data.ntier_app_arch+"','"+data.hosting_location+"','"+data.virtual_environ+"','"+data.dr_available+"','"+data.app_hardware+"','"+data.app_os_family+"','"+data.app_os+"','"+data.db+"','"+data.db_hardware+"','"+data.dbos_sys_family+"','"+data.db_os+"','"+data.client_hardware+"','"+data.client_os+"','"+data.nw_accessiblity+"','"+data.network+"','"+data.no_inter_otherapp+"','"+data.depinteg_core+"','"+data.totres_supapp+"','"+data.no_of_users+"','"+data.types_of_users+"','"+data.no_of_licenses+"','"+data.type_of_license+"','"+data.monthly_trans+"',"+parseInt(data.sw_yearly_cost)+","+parseInt(data.half_yearly_cost)+","+parseInt(data.telco_yearly_cost)+","+parseInt(data.vendor_supp_cost)+","+parseInt(data.proj_benefits)+",'"+data.yearly_support_cost+"','"+data.vend_supp_app+"','"+data.isapp_still_vend+"','"+data.vend_hav_locoff+"','"+data.obs_tech_supp_sol+"','"+data.obsolete_tech+"','"+data.obs_tech_remarks+"','"+data.curr_supp_insource+"','"+data.curr_supp_osource+"','"+data.curr_supp_joint+"','"+data.curr_supp_remarks+"','"+data.curr_enha_insource+"','"+data.curr_enha_osource+"','"+data.curr_enha_joint+"','"+data.curr_enha_remarks+"','"+data.source_avail_yes+"','"+data.source_avail_no+"','"+data.source_ifno_poss+"','"+data.source_availremark+"','"+data.rational_plan+"','"+data.rational_remarks+"','"+data.rational_genremark+"','"+data.enduser_comp_app+"','"+data.msa_worry_bucket+"','"+data.sustain_assessrisk+"','"+data.msa_app+"','"+data.itb_techrisk_involve	+"','"+data.business_platform+"','"+data.prob_apps+"','"+data.blueprint_critical+"',"+parseInt(data.isApproved)+")"
    
     console.log("Query  :"+ req.query);
       // return;
    
       //req.query =connection.query;
       mysql_helper.insertValues(req, function (status, rows) {
           
           console.log(status);
           //return;
           
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }];
            res.send(jsonResponse);
        }
  
     });
    
    

});

app.post('/updateApp', urlencodedParser, function (req, res) {

        
    var data  = req.body;
     jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("update:"+data)
    
   // connection.query = "INSERT IGNORE INTO employees (id, name,location,Gender,Age)  VALUES " +data
     req.query = "update employees set app_id='"+data.app_id+"', app_name='"+data.app_name+"' , app_description='"+data.app_description+"' , business_sect='"+data.business_sect+"' , business_subsect='"+data.business_subsect+"' , business_owner='"+data.business_owner+"' , it_dept='"+data.it_dept+"' , it_owner='"+data.it_owner+"' , domain_lead='"+data.domain_lead+"' , ea_domain='"+data.ea_domain+"' ,  business_capability='"+data.business_capability+"' , business_criticality='"+data.business_criticality+"' , avail_requirements='"+data.avail_requirements+"' , country_usage='"+data.country_usage+"' , year_implemented="+parseInt(data.year_implemented)+" , age_of_app="+parseInt(data.age_of_app)+" , message_format='"+data.message_format+"' , app_plan='"+data.app_plan+"' , appsoft_type='"+data.appsoft_type+"' , app_server='"+data.app_server+"' , integrattion_type='"+data.integrattion_type+"' , appsoft_prodname='"+data.appsoft_prodname+"' ,  prog_lang='"+data.prog_lang+"' , report_tool='"+data.report_tool+"' , app_architecture='"+data.app_architecture+"' , ntier_app_arch= '"+data.ntier_app_arch+"' , hosting_location='"+data.hosting_location+"' , virtual_environ='"+data.virtual_environ+"' , dr_available= '"+data.dr_available+"' , app_hardware='"+data.app_hardware+"' , app_os_family='"+data.app_os_family+"' , app_os='"+data.app_os+"' , db='"+data.db+"' , db_hardware='"+data.db_hardware+"' ,  dbos_sys_family='"+data.dbos_sys_family+"', db_os='"+data.db_os+"' , client_hardware='"+data.client_hardware+"' , client_os='"+data.client_os+"' , nw_accessiblity='"+data.nw_accessiblity+"' , network='"+data.network+"' , no_inter_otherapp='"+data.no_inter_otherapp+"' , depinteg_core='"+data.depinteg_core+"' , totres_supapp='"+data.totres_supapp+"' , no_of_users='"+data.no_of_users+"' , types_of_users='"+data.types_of_users+"' , no_of_licenses='"+data.no_of_licenses+"' , type_of_license='"+data.type_of_license+"' , monthly_trans='"+data.monthly_trans+"' , sw_yearly_cost="+parseInt(data.sw_yearly_cost)+" , half_yearly_cost="+parseInt(data.half_yearly_cost)+" , telco_yearly_cost="+parseInt(data.telco_yearly_cost)+" , vendor_supp_cost="+parseInt(data.vendor_supp_cost)+" , proj_benefits="+parseInt(data.proj_benefits)+" , yearly_support_cost='"+data.yearly_support_cost+"' , vend_supp_app='"+data.vend_supp_app+"' , isapp_still_vend='"+data.isapp_still_vend+"' , vend_hav_locoff='"+data.vend_hav_locoff+"' ,  obs_tech_supp_sol='"+data.obs_tech_supp_sol+"' , obsolete_tech='"+data.obsolete_tech+"' , obs_tech_remarks='"+data.obs_tech_remarks+"' , curr_supp_insource='"+data.curr_supp_insource+"' , curr_supp_osource='"+data.curr_supp_osource+"' , curr_supp_joint='"+data.curr_supp_joint+"' , curr_supp_remarks='"+data.curr_supp_remarks+"' , curr_enha_insource='"+data.curr_enha_insource+"' , curr_enha_osource='"+data.curr_enha_osource+"' , curr_enha_joint='"+data.curr_enha_joint	+"' , curr_enha_remarks='"+data.curr_enha_remarks+"' , source_avail_yes='"+data.source_avail_yes+"' , source_avail_no='"+data.source_avail_no+"' , source_ifno_poss='"+data.source_ifno_poss+"' , source_availremark='"+data.source_availremark+"' , rational_plan='"+data.rational_plan+"' , rational_remarks='"+data.rational_remarks+"' , rational_genremark='"+data.rational_genremark+"' , enduser_comp_app='"+data.enduser_comp_app+"' , msa_worry_bucket='"+data.msa_worry_bucket+"' , sustain_assessrisk='"+data.sustain_assessrisk+"' , msa_app='"+data.msa_app+"' , itb_techrisk_involve='"+data.itb_techrisk_involve	+"' , business_platform='"+data.business_platform+"' , prob_apps='"+data.prob_apps+"' , blueprint_critical='"+data.blueprint_critical+"' WHERE id="+parseInt(data.id)+";"
    
      console.log("Query  :"+ req.query);
       
    
       //req.query =connection.query;
       mysql_helper.updateValues(req, function (status, rows) {
           console.log(status);
             //return; 
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }];
             res.send(jsonResponse);
        }
  
     });
   
    

});

app.post('/deleteApp', urlencodedParser, function (req, res) {

        
    var data  = req.body;
     jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("delete:"+req.body.id);
   // connection.query = "INSERT IGNORE INTO employees (id, name,location,Gender,Age)  VALUES " +data
     req.query = "delete FROM `employees` WHERE id="+parseInt(req.body.id); 
    
     // console.log("Query  :"+ connection.query);
    
    
       //req.query =connection.query;
       mysql_helper.insertValues(req, function (status, rows) {
           console.log(rows)
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }];
        }
  
     });
    res.send(jsonResponse);
    

});
app.post('/approve', urlencodedParser, function (req, res) {

        
    var data  = req.body;
     jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("approve:"+req.body.id);
   // connection.query = "INSERT IGNORE INTO employees (id, name,location,Gender,Age)  VALUES " +data
     req.query =  "update employees set isApproved=1 WHERE id="+parseInt(req.body.id)+";" 
    
     // console.log("Query  :"+ connection.query);
    
    
       //req.query =connection.query;
       mysql_helper.insertValues(req, function (status, rows) {
           console.log(rows)
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }];
            
            res.send(jsonResponse);
        }
  
     });
    
    

});
app.post('/isLogin', urlencodedParser, function (req, res)
{
     sess = req.session;
    console.log("sess :"+JSON.stringify(sess))
    //var loggedin = sess.isLoggedIn;
    //console.log("from session loggedin :"+loggedin)
     jsonResponse = [{
                status:sess.isLoggedIn,
                isloggeduser:sess.isLoggedInUser,
                isadmin:sess.isadmin
                }];
              res.send(jsonResponse);  
    
});
app.post('/login', urlencodedParser, function (req, res) {
    
    var data = req.body;
    
    console.log(data.username)
       // SELECT `username`, `password` FROM `users` WHERE 1
     req.query = "select * FROM users WHERE username='"+data.username+"' and password='"+req.body.password+"';"
     sess = req.session;
    console.log("sess :")
    console.log(req.query)
      mysql_helper.getValues(req, function (status, rows) {
          //var getIndex = rows.findIndex(x => x.username = data.username)
        
          //console.log("getData.length:"+rows.length)
          //console.log("rows:"+rows[0].isAdmin);
          //return;
          
          if(rows.length>0){
           
            sess.isLoggedIn = true;
            sess.isLoggedInUser = data.username;
              if(rows[0].isAdmin == '1')
                sess.isadmin = true; 
              else
                   sess.isadmin = false; 
              jsonResponse = [{
                status: "success",
                data: rows
                }];
               
            console.log(" success length > 0");
          }
          else{
               sess.isLoggedIn = false;
               jsonResponse = [{
                status: "failure",
                data: ""
                }];
              console.log(" failure length == 0");
          }
         res.send(jsonResponse);
//        if (status == "success") {
//        jsonResponse = [{
//        status: "success",
//        data: ""
//        }];
//        }
  
     });
    
   // console.log(req.body);

});
app.post('/register', urlencodedParser, function (req, res) {
    
    console.log(req.body);
    req.query = "INSERT INTO users (username,password,isAdmin) VALUES ('"+req.body.regusername+"','"+req.body.regpassword+"',"+parseInt(req.body.isAdmin)+")"
    
    console.log("query:"+req.query)
     mysql_helper.insertValues(req, function (status, rows) {
          
           console.log(status);
        if (status == "success") {
                req.query = "select * FROM users WHERE username='"+req.body.regusername+"' and password='"+req.body.regpassword+"';"
     sess = req.session;
    console.log("sess :")
    console.log(req.query)
      mysql_helper.getValues(req, function (status, rows) {
          //var getIndex = rows.findIndex(x => x.username = data.username)
        
          //console.log("getData.length:"+rows.length)
          //console.log("rows:"+rows[0].isAdmin);
          //return;
          
          if(rows.length>0){
           
            sess.isLoggedIn = true;
            sess.isLoggedInUser = req.body.regusername;
              if(rows[0].isAdmin == '1')
                sess.isadmin = true; 
              else
                   sess.isadmin = false; 
              jsonResponse = [{
                status: "success",
                data: rows
                }];
               
            console.log(" success length > 0");
          }
          else{
               sess.isLoggedIn = false;
               jsonResponse = [{
                status: "failure",
                data: ""
                }];
              console.log(" failure length == 0");
          }
         res.send(jsonResponse);
//        if (status == "success") {
//        jsonResponse = [{
//        status: "success",
//        data: ""
//        }];
//        }
  
     });
        }
  
     });

});
app.post('/checkusername', urlencodedParser, function (req, res) {
    
    console.log(req.body.user);
     req.query = "select username FROM users WHERE username='"+req.body.user+"';"
     
      mysql_helper.getValues(req, function (status, rows) {
          //var getIndex = rows.findIndex(x => x.username = data.username)
          var getData = JSON.stringify(rows);
          console.log("status:"+status)
          //console.log("rows:" +rows[0]);
          //return;
          if(rows.length>0){
           
                jsonResponse = [{
                status: "success",
                data: rows
                }];
               
            console.log(" success length > 0");
          }
          else{
              
               jsonResponse = [{
                status: "failure",
                data: ""
                }];
              console.log(" failure length == 0");
          }
         res.send(jsonResponse);
     });
    //return;

});
app.post('/logoff', urlencodedParser, function (req, res) {
      console.log('called');
      sess.destroy(); 
      sess.isLoggedIn = false;
      sess.isLoggedInUser='';
      sess.isadmin = false;
     
})
//connection.end();
// Binding express app to port 3000
app.listen(app.get('port'),function(){
    console.log('Node server running @ http://localhost:3000')
});