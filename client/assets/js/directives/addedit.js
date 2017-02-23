rogueone.directive('addeditform',['Inventory','$route','$rootScope', function (Inventory) {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@',
            app: '=',
            invokemethod: "&"
        },
        templateUrl: 'client/templates/tabbased.html',
        //controller: controllerFunction, //Embed a custom controller in the directive
        link: function (scope, elem, attrs) {
            scope.currentyear = new Date().getFullYear();
            //console.log()
            scope.setyearimpl = function(val){
                scope.age_of_app = parseInt(scope.currentyear - parseInt(val));
                console.log(typeof(scope.age_of_app));
                $('.ageofape').val(scope.age_of_app);
                //scope.currentyear 
            }
               scope.AddtoInventry = function(status,index){
                   //console.log( $('#tab2default'))
                   if(index == '3'){
                       this.app.age_of_app = scope.age_of_app;
                   }
                   console.log(index)
                   if(status =='save' && index != 'null'){
                       $("#newtabs li:eq("+index+") a").removeClass('hide');
                        $("#newtabs li:eq("+index+") a").tab('show');
                   }
                   else{
                       
                         
                  // return;
                var datas  = this.app;
                console.log(datas);
                      
                        if(status == 'Submit'){
                            datas.isApproved = 0;
                            console.log('new');
                            Inventory.newAppEntry(datas).then(function(response){
                            console.log(response)
                            //loaddata(); 
                            //scope.invokemethod();
                            toastr.success("Successfully submitted for approval from admin");
                            window.location.href= "#/dash";

                            }).catch(function(response){

                            })    
                        }
                        else{
                            Inventory.updateAppEntry(datas).then(function(response){
                            
                            })
                        }  
                   } 
                 
        }
               
        scope.nextTab = function(index){
           console.log(index);
            
        }
        scope.backbtn = function(){
            window.location.href="#/dash"
        }
            
        } //DOM manipulation
    }
}]);