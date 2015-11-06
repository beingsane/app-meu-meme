// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var APP = angular.module('starter', ['ionic','ngCordova']);

APP.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

APP.controller('indexController', function ($scope, $cordovaCamera, $cordovaSocialSharing, $cordovaFile, $window, $timeout){
  
  //ionic.Platform.fullScreen();

  $scope.generatorScreenshot = false;

  document.addEventListener("deviceready", function () {
    var cameraOptions = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };


    $scope.takePicture = function() {
      $cordovaCamera.getPicture(cameraOptions).then(function(imageData) {
        $scope.urlData = "data:image/jpeg;base64," + imageData;

        var image = document.getElementById('panelApp');
        image.style.background = 'url(' + $scope.urlData + ') no-repeat center center';
        image.style.backgroundSize = 'cover';
      });
    }
   }, false);

  $scope.share = function(){
      $scope.generatorScreenshot = true;
      $timeout(function (){
        navigator.screenshot.save(function(error,res){
          if(error){
            $scope.generatorScreenshot = false;
            console.error(error);
          }else{
            $scope.generatorScreenshot = false;
            $cordovaSocialSharing
              .share(null, null, "file://"+res.filePath, null) // Share via native share sheet
              .then(function(result) {
                console.log("Compartilhado");
              }, function(err) {
                // An error occured. Show a message to the user
                console.log("Não Compartilhado: ", err);
            });
          }
        });
      }, 200);
  }



  $window.addEventListener('native.keyboardshow', function(){
    document.getElementById("textoimagemRodape").style.bottom="300px";
  });
  $window.addEventListener('native.keyboardhide', function(){
    document.getElementById("textoimagemRodape").style.bottom="50px";
  });


});