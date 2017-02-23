
rogueone.directive('editform',['Inventory','$route','$rootScope', function (Inventory) {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@',
            app: '=',
            invokemethod: "&"
        },
        templateUrl: 'client/templates/edittpl.html',
        //controller: controllerFunction, //Embed a custom controller in the directive
        link: function (scope, elem, attrs) {
            scope.currentyear = new Date().getFullYear();
            //console.log()
            scope.setyearimpl = function(val){
                scope.age_of_app = parseInt(scope.currentyear - parseInt(val));
                //console.log(scope.age_of_app);
                $('.ageofape').val(scope.age_of_app);
                //scope.currentyear 
            }
               scope.AddtoInventry = function(status,index){
                     //$('.agetab').serialize();
                    // console.log($('#getage').val());
                   if(index == '3'){
                       this.app.age_of_app = parseInt($('#getage').val());
                   }
                   var datas  = this.app;
                   
                 //  console.log(datas);
                   if(status =='Update'){
                        //datas.isApproved = 0;
                        //var datas  = this.app;
                        //console.log(datas);

                        Inventory.updateAppEntry(datas).then(function(response){
                            //loaddata(); 
                              scope.invokemethod();
                              toastr.success("Successfully Updated App");
                            //console.log(response);
                            window.location.href= "#/dash";
                        }) 
                        
                   } 
                 
        }
               
//         if(status =='save' && index != 'null'){
//                       $("#edittabs li:eq("+index+") a").removeClass('hide');
//                        $("#edittabs li:eq("+index+") a").tab('show');
//                   }
               
        scope.nextTab = function(index){
           console.log(index);
            
        }
        scope.backbtn = function(){
            window.location.href="#/dash"
        }
         
            
        } //DOM manipulation
    }
}]);