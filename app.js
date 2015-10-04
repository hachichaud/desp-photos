(function(angular) {
  'use strict';
var myApp = angular.module('despApp', ['ngMaterial']);

myApp.controller('MainController', function($scope, $http, $mdDialog) {
    $scope.photos = [];
    $http.get('/images/')
    .then(function(res){
      $scope.photos = res.data
      .match(/a href=".*(jpg|png)"/gi)
      .map(function(link){
        return link.replace(/a href="(.*)"/, '$1')
      });
    });

    function DialogController($scope, $mdDialog, photos, currentPhoto) {
      $scope.currentPhoto = currentPhoto;
      $scope.photos = photos;
      console.log(currentPhoto);
      $scope.close = $mdDialog.hide;
    }

    $scope.viewPhoto = function(ev, photo) {
      $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {
        photos: $scope.photos,
        currentPhoto: photo
      }
    });
    };

});

})(window.angular);
