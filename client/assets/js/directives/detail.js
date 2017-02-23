

rogueone.directive('detailview',['Inventory','$route','$rootScope', function (Inventory) {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@',
            app: '=',
            invokemethod: "&"
        },
        templateUrl: 'client/templates/detail_tpl.html',
        //controller: controllerFunction, //Embed a custom controller in the directive
        link: function (scope, elem, attrs) {
            scope.currentyear = new Date().getFullYear();
            //console.log()
            scope.setyearimpl = function(val){
                scope.age_of_app = parseInt(scope.currentyear - parseInt(val));
                console.log(scope.age_of_app);
                $('.ageofape').val(scope.age_of_app);
                //scope.currentyear 
            }
               scope.AddtoInventry = function(status,index){
                   //console.log( $('#tab2default'))
                   if(index == '3'){
                       this.app.age_of_app = scope.age_of_app;
                   }
                   var datas  = this.app;
                console.log(datas);
                   if(status =='save' && index != 'null'){
                       $("#edittabs li:eq("+index+") a").removeClass('hide');
                        $("#edittabs li:eq("+index+") a").tab('show');
                   }
                   else{
                       
                         
                  // return;
                var datas  = this.app;
                console.log(datas);
                      
                        if(status == 'Update'){
                           // console.log('new');
                            Inventory.updateAppEntry(datas).then(function(response){
                            //loaddata(); 
                             scope.invokemethod();
                             console.log(response);
                             window.location.href= "#/dash";
                            })   
                        }
                        
                   } 
        }
               
        scope.nextTab = function(index){
           console.log(index);
            
        }
        
        } //DOM manipulation
    }
}]);