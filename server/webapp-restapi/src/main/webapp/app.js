var main = angular.module("main", []);

main.controller("FormCtrl", function($scope, $http) {
    var endpoint = "rest/";
        $scope.formData = {};
        $scope.submit = function() {
                $http({
                method: 'POST',
                url: endpoint + $scope.action,
                data: $scope.formData,
                headers: { 'Content-Type': 'application/json',
                                        'Authorization': 'Basic YUBhLmNvbTph'}
            }).success(function(data) {
                console.log("Data was sent");
               $scope.resource =  data;
            });
    }
    $scope.getData = function() {
        return $http({
            method: 'GET',
            headers: {'Authorization': 'Basic YUBhLmNvbTph'},
            url: endpoint + $scope.action,
        }).success(function(data) {
            $scope.output =  data; 
        }); 
    }
});