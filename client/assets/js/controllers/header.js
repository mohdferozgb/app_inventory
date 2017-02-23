
rogueone.controller("headerctrl", function($scope,$route, $window,$rootScope,Inventory,$http,Excel,$timeout,Account) {
    
    $scope.logout  = function(){
        //console.log('comes')
         Inventory.logoff().then(function(response){
             toastr.success("Successfully Logged off");

        });
    }

});