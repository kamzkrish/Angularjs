var app= angular.module('myapp', [ngRoute])
app.config(function($routeProvider)){
           
$routeProvider
.when('/',{
           templateUrl:'pages/login.html',
           controller:'login-controller'
           })

.when('/signup',{
            templateUrl:'pages/signup.html',
            controller:'signup-controller'
                })

.when('/profile',{
    
            templateUrl:'pages/profile.html',
            controller:'profile-controller'
                })

.when('/message',{
    
            templateUrl:'pages/message.html',
            controller:'message-controller'
                })

.when('/newmessage',{
            templateUrl:'pages/newmessage.html',
            controller:'newmessage-controller'
})

app.controller('login-controller','$scope',function(){
            
    
});
app.controller('signup-controller','$scope',function(){
    
});

app.controller('message-controller','$scope',function(){
    
});

app.controller('newmessage-controller','$scope',function(){
    
});
