rogueone.controller("detailctrl", function($scope,$rootScope,$route,Inventory,$http) {

    $scope.newEntry = false, $scope.detailview = false,$scope.editdata='',$rootScope.Appdata='',$rootScope.showbackbtn=true;
  
    
    $scope.setView = function(){
        var getstate = window.location.href,
           delimiter = '/',
           start = 1,
           tokens = getstate.split(delimiter).slice(start),
           result = tokens.join(delimiter);
       // console.log(tokens[3])
        if(tokens[3] == 'AddNew'){
             $scope.newEntry = true;
            $rootScope.Appdata = {
                status:'New',
            }
        }
        else if(tokens[3] == 'editview'){
             $scope.EditEntry = true;
        }
        else if(tokens[3] == 'detail'){
             $scope.detailview = true;
        }
        
    }
    
     $scope.setView();
    
    $rootScope.backbtn = function(){
        window.location.href="#/dash"
    }
}); //controller