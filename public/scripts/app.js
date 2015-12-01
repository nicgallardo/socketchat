var socket = io();

angular.module('chatterApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/room-one', {
          templateUrl: '/partials/room-one.html',
          controller: 'RoomOneController',
        })
        .when('/', {
          templateUrl: '/partials/home.html',
          controller: 'HomeController',
        });
      $locationProvider.html5Mode(true);
  }])
  .controller('HomeController', ['$route', '$routeParams', '$location', '$scope',
    function($route, $routeParams, $location, $scope){
      //attempt to add messages from server db
      $scope.messages;

      socket.emit('while gone', "");

      socket.on('while gone', function(msg){
        $scope.messages = msg;

        console.log($scope.messages);
        $scope.$apply();
      })

      $('form').submit(function(){

        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
      });
  }])
  .controller('RoomOneController', ['$route', '$routeParams', '$location', '$scope',
    function($route, $routeParams, $location){
      // $scope.hello = "hello"
      message = "hello users!";
      socket.emit('user msg', message);
      socket.on('user msg', function(msg){
        $('#userMessage').append($('<li>').text(msg))
      });
  }])
