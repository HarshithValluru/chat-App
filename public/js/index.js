var app = angular.module("chat-app",[]);
app.controller("chat-controller",function($scope, $http) {
    $scope.selectValue = "None";
    $http.get('http://localhost:3000/retrieve')
		.then(function(response){
            $scope.roomsList = response.data;
		},function(error) {
			console.log("Error: ",error);
        });

    $scope.roomInputChanged = function() {
        if($scope.roomValue !== "")
            $("#selectId").val("None");
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