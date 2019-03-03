var app = angular.module('myApp',['ngRoute'])
app.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
        templateUrl: "pages/login.html",
        controller: "loginCntrl"
    })
    .when('/signup',{
        templateUrl: "pages/signup.html",
        controller: "signUpCntrl"
    })
    .when('/profile',{
        templateUrl: "pages/profile.html",
        controller: "profileCntrl"
    })
    .when('/messages',{
        templateUrl: "pages/messages.html",
        controller: "messagesCntrl"
    })
    .when('/viewMessage/:sender/:message/:index',{
        templateUrl: "pages/mesgView.html",
        controller: "mesgViewCntrl"
    })
    .when('/newMessage',{
        templateUrl: "pages/newMessage.html",
        controller: "newMessageCntrl"
    })
})



app.controller('loginCntrl',['$scope','$rootScope','$location',function($scope,$rootScope,$location) {
    $rootScope.fname =""
    $scope.alert =""
   $scope.user =""
   $scope.pass = ""
   $scope.login = function(){
       var users = JSON.parse(localStorage.getItem("users"))
       if(users){
           for (let i = 0; i < users.length; i++) {
              if(users[i].username == $scope.user){
                  if(users[i].password == $scope.pass){
                    $rootScope.fname = $scope.user
                    $location.path("/profile" )
                    break
                  }else{
                      $scope.alert = "Password Wrong"
                      break
                  }
              }
           }
       }else{
           $scope.alert = "Sigup First "
       }
   }
}])

app.controller('signUpCntrl',['$scope',function($scope) {
    $scope.alert =""
    $scope.user =""
    $scope.pass = ""
    $scope.signup = function() {
    $scope.newuser = {
            "username":$scope.user,
            "password" : $scope.pass,
            "FirstName":$scope.fname,
            "LastName":$scope.lname,
            "Email":$scope.mail,
            "Phone":$scope.phone,
            "loaction":$scope.location
        }
        var users  = JSON.parse(localStorage.getItem("users"))
        if(!users){
            users = [$scope.newuser]
            localStorage.setItem("users",JSON.stringify(users))

        }else{
            users.push($scope.newuser)
            localStorage.setItem("users",JSON.stringify(users))
        }
        $scope.alert ="success"
        $location.path("/")
    }
}])

app.controller('profileCntrl',['$scope','$rootScope',function($scope,$rootScope) {
    $scope.alert =""
    var users  = JSON.parse(localStorage.getItem("users"))
    for (let i = 0; i < users.length; i++) {
        if(users[i].username == $rootScope.fname){
            $scope.user = users[i].username
            $scope.pass = users[i].password
            $scope.fname = users[i].FirstName 
            $scope.lname = users[i].LastName
            $scope.mail = users[i].Email
            $scope.phone = users[i].Phone
            $scope.location = users[i].loaction
              break
        }
     }
     $scope.save = function(){
        for (let i = 0; i < users.length; i++) {
            if(users[i].username == $rootScope.fname){
                users[i].username = $scope.user
                users[i].password = $scope.pass 
                users[i].FirstName = $scope.fname
                users[i].LastName = $scope.lname 
                users[i].Email= $scope.mail
                users[i].Phone = $scope.phone 
                users[i].loaction= $scope.location
                localStorage.setItem("users",JSON.stringify(users))
                $scope.alert ="successfully saved"
                break
            }
         }
     }
}])

app.controller('messagesCntrl',['$scope','$rootScope',function($scope,$rootScope,$location) {
    var users  = JSON.parse(localStorage.getItem("users"))
    $scope.messages = ""
    for (let i = 0; i < users.length; i++) {
        if(users[i].username == $rootScope.fname){
           $scope.messages = users[i].messages
              break
        }
     }
}])

app.controller('newMessageCntrl',['$scope','$rootScope','$location',function($scope,$rootScope,$location) {
    $scope.alert = ""
    $scope.recipient = ""
    $scope.message = ""
    $scope.messageToSend = {
        sender: $rootScope.fname
    }
   $scope.send = function(){
    $scope.messageToSend.recipient = $scope.recipient
    $scope.messageToSend.message = $scope.message
    var users  = JSON.parse(localStorage.getItem("users")),
        userFound = false
    for (let i = 0; i < users.length; i++) {
        if(users[i].username == $scope.recipient){
            userFound = true
            if(users[i].messages){
                users[i].messages.push($scope.messageToSend)
            }else{
                users[i].messages = [$scope.messageToSend]
            } 
            localStorage.setItem("users",JSON.stringify(users))
            $scope.alert ="successfully sent"
            $location.path("/messages")
            break
        }
     }
     if(!userFound){
        $scope.alert ="Recepient not found"
     }
   }
}])

app.controller('mesgViewCntrl',['$scope','$rootScope','$location','$routeParams',function($scope,$rootScope,$location,$routeParams) {
   $scope.alert = ""
   $scope.messageIndex =$routeParams.index
   $scope.message =$routeParams.message
   $scope.sender = $routeParams.sender
   $scope.reply=""
   $scope.send = function(){
       var obj = {
        "sender": $rootScope.fname,
	    "recipient": $scope.sender,
	    "message": $scope.reply
       }
       var users = JSON.parse(localStorage.getItem('users'))
       for (let i = 0; i < users.length; i++) {
        if(users[i].username == $scope.sender){
            if(users[i].messages){
                users[i].messages.push(obj)
            }else{
                users[i].messages = [obj]
            } 
            localStorage.setItem("users",JSON.stringify(users))
            $scope.alert ="successfully sent"
            $location.path("/messages")
            break
        }
     }
   }
   $scope.delete = function(){
       console.log("entered");
       
    var users = JSON.parse(localStorage.getItem('users'))
    for (let i = 0; i < users.length; i++) {
        if(users[i].username == $rootScope.fname){
            users[i].messages.splice($scope.messageIndex,1)
            localStorage.setItem("users",JSON.stringify(users))
            $scope.alert ="message deleted"
            $location.path("/messages")
            break
        }
     }
   }
   $scope.markAsImportant = function(){

   }
}])

