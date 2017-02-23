rogueone.controller("homectrl", function($scope,$route, $window,$rootScope,Inventory,$http,Excel,$timeout,Account) {
   // $scope.refreshdata = false;
    // $window.location.reload();
    $scope.tableData = '',$scope.PageSize = 10,$scope.allkeys=[],$scope.gridOptions={},$rootScope.isloggeduser='',$rootScope.showbackbtn=false,$rootScope.bypass=false,$scope.showmore=false,$scope.arrayMap = {};;
    // loaddata();
    
    $scope.actions=true,$scope.id=true,$scope.app_id=true,$scope.app_name=true,$scope.app_desc=true,$scope.buss_sector=true,$scope.buss_subsect=true,$scope.bus_owner=true,$scope.it_dept=true,$scope.it_owner=true,$scope.domain_lead=true,$scope.ea_domain=true,$scope.ea_domain=true,$scope.bus_capagrop=true,$scope.bus_criticality=true,$scope.avail_req=true,$scope.country_usage=true,$scope.year_implement=true,$scope.age_of_app=true,$scope.message_format=true,$scope.app_plan=true,$scope.app_soft_type=true,$scope.app_server=true,$scope.integration_type=true,$scope.app_soft_prodname=true,$scope.prog_language=true,$scope.report_tool=true,$scope.app_architecture=true,$scope.ntier_app_architecture=true,$scope.host_location=true,$scope.virtual_environment=true,$scope.dr_available=true,$scope.app_hardware=true,$scope.app_os_sysfamily=true,$scope.app_os_system=true,$scope.app_db=true,$scope.app_db_hardware=true,$scope.db_os_sysfamily=true,$scope.db_os_system=true,$scope.client_hardware=true,$scope.client_os=true,$scope.nw_accessibility=true,$scope.network=true,$scope.no_of_othapp=true,$scope.depend_integ_core=true,$scope.tot_fte_supapp=true,$scope.no_of_users=true,$scope.type_of_users=true,$scope.no_of_licenses=true,$scope.type_of_license=true,$scope.monthly_trans_vol=true,$scope.soft_year_supcost=true,$scope.hard_year_supcost=true,$scope.telco_year_supcost=true,$scope.vendor_year_supcost=true,$scope.proj_benefits=true,$scope.year_suppcost_mainapp=true,$scope.vendor_supp_app=true,$scope.isapp_supp_vendor=true,$scope.does_vendor_localoff=true,$scope.anyobsol_tech_suppsol=true,$scope.obsol_tech=true,$scope.obs_tech_remarks=true,$scope.curr_supp_insource=true,$scope.curr_supp_outsource=true,$scope.curr_supp_joint=true,$scope.curr_supp_remark=true,$scope.curr_enhan_insource=true,$scope.curr_enhan_outsource=true,$scope.curr_enhan_joint=true,$scope.curr_enhan_remark=true,$scope.source_code_availyes=true,$scope.source_code_availno=true,$scope.source_code_possible=true,$scope.app_rational=true,$scope.app_rational_remark=true,$scope.app_rational_genremark=true,$scope.enduser_comp_apps=true,$scope.msa_worry_bucket=true,$scope.sustainability_assessment_risk=true,$scope.msa_app=true,$scope.itb_tech_risk=true,$scope.itb_buss_plat=true,$scope.itb_prob_apps=true,$scope.blueprint_critical=true;
    
       $scope.smallarray =[
   "actions",
   "id",
"app_id",
"app_name",
"app_desc",
"bus_sect",
"bus_subsect",
"bus_owner",
"it_dept",
"it_owner",
"domain_lead",
"ea_domain",
"bus_capagrop",
"bus_criticality",
"avail_req",
"country_usage",
"year_implement",
"age_of_app",
"message_format",
"app_plan",
"app_soft_type",
"app_server",
"integration_type",
"app_soft_prodname",
"prog_language",
"report_tool",
"app_architecture",
"ntier_app_architecture",
"host_location",
"virtual_environment",
"dr_available",
"app_hardware",
"app_os_sysfamily",
"app_os_system",
"app_db",
"app_db_hardware",
"db_os_sysfamily",
"db_os_system",
"client_hardware",
"client_os",
"nw_accessibility",
"network",
"no_of_othapp",
"tot_fte_supapp",
"no_of_users",
"type_of_users",
"no_of_licenses",
"type_of_license",
"monthly_trans_vol",
"soft_year_supcost",
"hard_year_supcost",
"telco_year_supcost",
"vendor_year_supcost",
"proj_benefits",
"year_suppcost_mainapp",
"vendor_supp_app",
"isapp_supp_vendor",
 "does_vendor_localoff",
"anyobsol_tech_suppsol",
"obsol_tech",
"obsol_tech",
"curr_supp_insource",
"curr_supp_outsource",
"curr_supp_joint",
"curr_supp_remark",
"curr_enhan_insource",
"curr_enhan_outsource",
"curr_enhan_joint",
"curr_enhan_remark",
"source_code_availyes",
"source_code_availno",
"source_code_possible",
"app_rational",
"app_rational_remark",
"app_rational_genremark",
"enduser_comp_apps",
"sustainability_assessment_risk",
"msa_app",
"itb_tech_risk",
"itb_buss_plat",
"itb_prob_apps",
"blueprint_critical"

]

 
     
  Inventory.isuserloggedIn().then(function(response){
            
            $rootScope.isloggeduser = response.data[0].status;
      console.log(response.data[0].isloggeduser);
      if (!$rootScope.isloggeduser) {
           // console.log('DENY');
            //event.preventDefault();
            window.location.href="/"
        }
        else {
            $scope.loaddata();
            //console.log(window.location.href)
            window.location.href="#/dash";
            $rootScope.isloggedIn = true;
            $rootScope.currentUser = response.data[0].isloggeduser;
            $rootScope.isadmin = response.data[0].isadmin;
            //$rootScope.setData =''
            console.log('ALLOW');
            
        }
      });
    

    
    $scope.loaddata = function()
    {
        
       var timer =  setInterval(function(){
            Inventory.getHome().then(function(response){
            $scope.tableData = response.data;
            //$scope.setgrid($scope.smallarray,$scope.tableData);
            })
        },200);
        
        setTimeout(function( ) {  clearInterval(timer); }, 500);
        
 
    }
   
    $scope.setgrid = function(cols,rowdata){
       
  var gridOptions = {
    debug: true,
    columnDefs: $scope.gridOptions.columnDefs,
    rowData: [{"athlete":"Michael & Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8}
  ],
    enableSorting: true,
    enableFilter: true,
    enableColResize: true
};
        $scope.gridOptions.columnDefs={}


  $scope.gridOptions.columnDefs =[{
        headerName: "Athlete Details",
        children: [
            {headerName: "Athlete", field: "athlete", width: 150, filter: 'text'},
            {headerName: "Age", field: "age", width: 90, filter: 'number'},
            {headerName: "Country", field: "country", width: 120}
        ]
    },
    {
        headerName: "Sports Results",
        children: [
            {headerName: "Sport", field: "sport", width: 110},
            {headerName: "Total", columnGroupShow: 'closed', field: "total", width: 100, filter: 'number'},
            {headerName: "Gold", columnGroupShow: 'open', field: "gold", width: 100, filter: 'number'},
            {headerName: "Silver", columnGroupShow: 'open', field: "silver", width: 100, filter: 'number'},
            {headerName: "Bronze", columnGroupShow: 'open', field: "bronze", width: 100, filter: 'number'}
        ]
    }]


        

    }
    
 
    
 
    $scope.editrecord = function(val){
       
        var setdata = JSON.stringify(val);
                       
        $rootScope.setData=val;
        $rootScope.setData.status = 'Edit';
        $rootScope.setData.submitText = 'Update';
        window.location.href  = '#/editview';
        
    }
    $scope.delete  = function(val){
        //console.log(val.id);
       
        Inventory.deleteAppEntry(val).then(function(response){
            $scope.loaddata();
        });
        
        
    }
    $scope.approve = function(val){
        
         Inventory.isApprove(val).then(function(response){
             if(response.data[0].status == 'success'){
                  toastr.success("Successfully Approved App");
                  $scope.loaddata();
             }
            
            
            
        })
    }
    $scope.detailView = function(val){
      
        var setdata = JSON.stringify(val);
        $rootScope.setData=val;
        $rootScope.setData.status = 'Detail';
        window.location.href  = '#/detail';
    }
    $scope.Addnew = function(){
        $scope.refreshdata = true;
        window.location.href  ='#/AddNew'
    }
   
      
        $scope.sort = {
            column: '',
            descending: false
        };    
        $scope.changeSorting = function(column) {

            var sort = $scope.sort;
 
            if (sort.column == column) {
                sort.descending = !sort.descending;
            } else {
                sort.column = column;
                sort.descending = false;
            }
        };
    
    $scope.export2excel = function(tablename){
            var exportHref=Excel.tableToExcel('#'+tablename,'WireWorkbenchDataExport');
            $timeout(function(){location.href=exportHref;},100); // trigger download
    }
   
    $scope.showmoreless = function(status){
        $scope.showmore = status;
    }
    
     $(".table-striped thead td").click(function(){
       $scope.showFilterOption($(this));
    });
    
     $scope.showFilterOption = function(tdObject){
       
  var filterGrid = $(tdObject).find(".filter");
          console.log(filterGrid);
  if (filterGrid.is(":visible")){
    filterGrid.hide();
    return;
  }
  
  $(".filter").hide();
  
  var index = 0;
  filterGrid.empty();
  var allSelected = true;
  filterGrid.append('<div><input id="all" type="checkbox" checked>Select All</div>');
  
  var $rows = $(tdObject).parents("table").find("tbody tr");
  
  
  $rows.each(function(ind, ele){
    var currentTd = $(ele).children()[$(tdObject).index()];
    var div = document.createElement("div");
    div.classList.add("grid-item")
    var str = $(ele).is(":visible") ? 'checked' : '';
    if ($(ele).is(":hidden")){
      allSelected = false;
    }
    div.innerHTML = '<input type="checkbox" '+str+' ><span>'+currentTd.innerHTML+'</span>';
    filterGrid.append(div);
    $scope.arrayMap[index] = ele;
    index++;
  });
  
  if (!allSelected){
    filterGrid.find("#all").removeAttr("checked");
  }
  
  filterGrid.append('<div><input id="close" type="button" value="Close"/><input id="ok" type="button" value="Ok"/></div>');
  filterGrid.show();
  
  var $closeBtn = filterGrid.find("#close");
  var $okBtn = filterGrid.find("#ok");
  var $checkElems = filterGrid.find("input[type='checkbox']");
  var $gridItems = filterGrid.find(".grid-item");
  var $all = filterGrid.find("#all");
  
  $closeBtn.click(function(){
    filterGrid.hide();
    return false;
  });
  
  $okBtn.click(function(){
    filterGrid.find(".grid-item").each(function(ind,ele){
        console.log(ind)
      if ($(ele).find("input").is(":checked")){
        $($scope.arrayMap[ind]).show();
      }else{
        $($scope.arrayMap[ind]).hide();
      }
    });
    filterGrid.hide();
    return false;
  });
  
  $checkElems.click(function(event){
    event.stopPropagation();
  });
  
  $gridItems.click(function(event){
    var chk = $(this).find("input[type='checkbox']");
    $(chk).prop("checked",!$(chk).is(":checked"));
  });
  
  $all.change(function(){
    var chked = $(this).is(":checked");
    filterGrid.find(".grid-item [type='checkbox']").prop("checked",chked);
  })
  
  filterGrid.click(function(event){
    event.stopPropagation();
  });
  
  return filterGrid;
}
    
}); //controller