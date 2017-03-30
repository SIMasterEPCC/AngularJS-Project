angular.module('angularProject', []);  


function mainController($scope, $http) {  
    $scope.formData = {};

    $http.get('/api/medidas')
        .success(function(data) {
            $scope.medidas = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createMedida = function(){
        $http.post('/api/medidas', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.medidas = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.deleteMedida = function(id) {
        $http.delete('/api/medidas/' + id)
            .success(function(data) {
                $scope.medidas = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}