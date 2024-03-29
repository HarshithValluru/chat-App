var app = angular.module("chat-app",[]);
app.controller("chat-controller",function($scope, $http) {
    $scope.selectValue = "None";
    // $http.get('https://chat-with-harshi.herokuapp.com/retrieve')
    $http.get('http://localhost:3001/retrieve')
    // $http.get('https://chat-with-harshi-heroku-20.herokuapp.com/retrieve')
		.then(function(response){
            $scope.roomsList = response.data;
		},function(error) {
			console.log("Error: ",error);
        });

    $scope.roomInputChanged = function() {
        if($scope.roomValue !== "")
            $scope.selectValue = "None";
        else
            $("#selectId").val($scope.selectValue);
        console.log("Select Value in roomIp==",$scope.selectValue);
        console.log("Room Value in roomIp==",$scope.roomValue);
    };

    $scope.selectInputChanged = function() {
        $scope.roomValue = "";
        $scope.selectValue = $("#selectId").val();
        console.log("Selected Value in selectIp==",$scope.selectValue);
        console.log("Room Value in selectIp==",$scope.roomValue);
    };
});