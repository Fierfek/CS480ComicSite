var app = angular.module('SignupCtrl', []);

app.controller('SignupController', function($scope, $rootScope, $stateParams, $state, SignupService){
    
    $scope.formSubmit = function() {
      if(SignupService.Signup($scope.username, $scope.password, $scope.passwordConfirm, $scope.email)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $scope.passwordConfirm = '';
        $scope.email = '';
        $scope.question1 = '';
        $scope.answer1 = '';
        $scope.question2 = '';
        $scope.answer2 = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Invalid entry!";
      }   
    };



    app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var confirmPass = 'confirmPass';
    var mail = 'mail';
    var isAuthenticated = false;
    
    return {
      login : function(username, password, passwordConfirm, email) {
        isAuthenticated = username === admin && password === pass && passwordConfirm === confirmPass && email = mail;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
});
});