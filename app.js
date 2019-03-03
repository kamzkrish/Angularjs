var loginapp = angular.module('myapp',['ngRoute']);
var usersdb = JSON.parse(localStorage.getItem('users'));
loginapp.config(function($routeProvider){

    $routeProvider
    .when('/', {
        templateUrl:'login.html'
    })
    .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'signUpform'
        
    })
    .when('/loginpage', {
        templateUrl: 'login.html',
        
    })
    .when('/homepage',{
        templateUrl: 'homepage.html',
        controller: 'homecontroller'
    })
    .when('/profile',{
        templateUrl: 'profile.html',
        controller: 'profilecontroller'
    })
    .when('/messages',{
        templateUrl: 'messages.html',
        controller: 'messagecontroller'
    })
    .when('/logout', {
        templateUrl:'pages/login.html',
        controller: 'logoutcontroller'
    })
   
});


loginapp.controller('signUpform', function($scope, $rootScope, $location, $timeout){


    if(usersdb === null || usersdb.length === 0){
        //$location.path('/');
        console.log("Empty users");
        usersdb =[];
        
        if(flags === null || flags.length === 0){
            //$location.path('/');
            console.log("No users logged in!");
            flags = [];
            //$location.path('/');
        }else{ console.log(flags); }
    }
    else {
        console.log(usersdb);
    }

    $scope.saveUser = function(userinfo){
        /* btn.addEventListener('click', function(){

            for(i=0;i<usersdb.length;i++){

                if(usersdb[i].uname === userinfo.uname){
                    console.log("event listener error", usersdb[i].uname ,userinfo.uname);
                document.getElementById('notify').innerHTML = "User already exists, Try something else!";
                }
                else{
                    console.log("else addevent loop");
                    document.getElementById('notify').innerHTML = "";
                }
            }
        }); */
        console.log("hello");
        $scope.users = [];
            if($scope.userform.$valid){

                        $scope.users = {
                            uname: userinfo.uname,
                            fname: userinfo.fname,
                            lname: userinfo.lname,
                            password: userinfo.pwd,
                            emaild: userinfo.eid,
                            address: userinfo.address,
                            messages: []
                        };
                        usersdb.push($scope.users);
                        
                        
                        //console.log("User saved!");
                        //console.log("else loop");
                        document.getElementById('notify').innerHTML ="Sign up Successful!"; 
                        localStorage.setItem("users", JSON.stringify(usersdb));
                        //console.log(usersdb);
                        $timeout(function(){
                            $location.path('/loginpage');
                        }, 1000);
                    }
        else{
                console.log("Invalid!");
            }
    }
});

//login page controller//
loginapp.controller('login-controller', function($scope, $rootScope, $location){
 
    usersdb = JSON.parse(localStorage.getItem('users'));
    console.log(usersdb);
    flags = JSON.parse(localStorage.getItem('user_flags'));       
    $scope.login_auth = function() {
        if(usersdb === null){
            document.getElementById('notify').innerHTML = "No users! Please Register First..";
        }else{
            //$rootScope.Fullname = ;
            for(user in usersdb){
                if($scope.username === usersdb[user].uname &&
                $scope.password === usersdb[user].password){
                    $location.path('/homepage');
                    flag_obj_user = {
                        user:$scope.username,
                        pass:$scope.password,
                        flg: true
                    };
                   localStorage.setItem("user_flags", JSON.stringify(flag_obj_user));
                    console.log(flags);
                    break;
                }
                else{
                    document.getElementById('notify').innerHTML = "Incorrect Username Or Password!";
                }
        }
             console.log("user index: ",usersdb[user].uname); 
             $rootScope.fullname = usersdb[user].fname +" "+ usersdb[user].lname;
            console.log($rootScope.fullname);
            }
    }
    $scope.regUser = function(){
        $location.path('/signup');
    }
})
loginapp.directive("user", function() {
    return {
        restrict: 'E',
        scope: {
           fullname: '@'
        },
        template: '<h1>Welcome {{fullname}}</h1>'
    }
});

loginapp.controller('homecontroller', function($scope, $rootScope, $location){

    user_info = JSON.parse(localStorage.getItem('users'));
    user_flgs = JSON.parse(localStorage.getItem('user_flags'));

    for(user in user_info){
        if(user_flgs.user === user_info[user].uname && user_flgs.pass === user_info[user].password){
            $scope.msgs = user_info[user].messages;
            //console.log($scope.msgs);
        }
    }

});


//homepage controller//
loginapp.controller('profilecontroller', function($scope, $rootScope, $routeParams, $timeout, $location){

   user_info = JSON.parse(localStorage.getItem('users'));
    user_flgs = JSON.parse(localStorage.getItem('user_flags'));

    
    console.log("Current user: ",user_flgs.user+", Logged in: ",user_flgs.flg);
    for(user in user_info ){
        
        //console.log(user_flgs.user);
        if(user_flgs.user === user_info[user].uname && user_flgs.pass === user_info[user].password ){
        
            $scope.username = user_info[user].uname,
            $scope.first = user_info[user].fname,
            $scope.last = user_info[user].lname,
            $scope.password = user_info[user].password,
            $scope.emaild = user_info[user].emaild,
            $scope.address = user_info[user].address;
            $rootScope.ind = user;
            break;
        }
        else{
            console.log("error getting the values");
        }
    }
    $scope.value =$rootScope.ind;
    $scope.updateUser = function(){

        console.log($scope.value);
                   user_info[$scope.value].uname = $scope.username,
                    user_info[$scope.value].fname = $scope.first,
                    user_info[$scope.value].lname = $scope.last,
                    user_info[$scope.value].password = $scope.password,
                    user_info[$scope.value].emaild = $scope.emaild,
                    user_info[$scope.value].address = $scope.address; 
                    console.log(user_info);
                    localStorage.setItem('users', JSON.stringify(user_info));
                    document.getElementById('notify').innerHTML ="User Updated!"; 
                    $timeout(function(){
                        $location.path('/homepage');
                    }, 1000); 
                }
});


loginapp.controller('messagecontroller', function($scope, $rootScope, $location, $timeout){
user_info = JSON.parse(localStorage.getItem('users'));
user_flgs = JSON.parse(localStorage.getItem('user_flags'));

$scope.send_box = document.getElementById('send_id');
$scope.title = document.getElementById('t_id');
$scope.msg = document.getElementById('con1');
$scope.delmsg = document.getElementById('delbtn');

$scope.del_msg = function(msg_obj) {

   for(user in user_info){
       for(inuser in user_info[user].messages){
       if(user_info[user].messages[inuser].created_at === msg_obj.created_at){
        console.log("true");
        console.log("From: ",user_info[user].uname);
        console.log(user_info[user].messages.splice(inuser, 1));
        localStorage.setItem('users', JSON.stringify(user_info));
        break;
   }else{
       console.log("false");
   }
}
}
}

$scope.rep_msg = function(msg){
    
    console.log(msg);
      for(user in user_info){
        for(inuser in user_info[user].messages){
        if(msg.created_at===user_info[user].messages[inuser].created_at){
         console.log("true");
         console.log("From: ",user_info[user].uname);
         
         break;
        }
    }
}  
}

$scope.chngimg = function(){
    var img = document.getElementById('imgplus').src;
    if(img.indexOf('notify.png')!=-1){
        document.getElementById('imgplus').src ="pages/warning-icon.png";
        
    }
    else{
        document.getElementById('imgplus').src="pages/notify.png";
        
        if(img.indexOf('notify.png') == -1){
            
        }
       /*  for(user in user_info){
            if()
        } */
        //alert(img);
    }
        //alert("No toggle");
}

$scope.goback = function() {
    $location.path('/homepage');
}
    console.log("Current user: ",user_flgs.user+", Logged in: ",user_flgs.flg);
    $scope.send_msg = function() {
        if($scope.send_box.value === ""){
            document.getElementById('notify').innerHTML = "Enter Recipient!";
        }else if($scope.msg.value === ""){
            document.getElementById('notify').innerHTML = "Message body Empty! Please write something..";
        }
        else if($scope.title === ""){
            document.getElementById('notify').innerHTML = "Title Missing!";
        }
        else{
            console.log("All textboxes are not empty!");
            for(user in user_info){
                console.log("user loop: ",user);
                if($scope.send_box.value === user_info[user].uname){
                    console.log("sendboxvalue: ",$scope.send_box.value );
                    console.log("sender: true: ",user_flgs.user);
                    msg = {
                        recipient:user_info[user].uname,
                        recipient_img:"",
                        sender:user_flgs.user,
                        sender_img:"",
                        title:$scope.title.value,
                        description:$scope.msg.value,
                        created_at:new Date(),
                        important:0
                    };
                    user_info[user].messages = user_info[user].messages.concat(msg);
                    console.log(user_info[user].messages);
                    localStorage.setItem('users', JSON.stringify(user_info));
                    console.log(user_info);
                    document.getElementById('notify').innerHTML ="Message Sent!";
                     $timeout(function(){
                        $location.path('/homepage');
                     }, 1000);
                     break;
                        
                }else{
                    //console.log("not true");
                    document.getElementById('notify').innerHTML = "Invalid Recipient username!";
                }
            }
        }
    }
    for(user in user_info){
        if(user_flgs.user === user_info[user].uname && user_flgs.pass === user_info[user].password){
            $scope.msgs = user_info[user].messages;
            //console.log($scope.msgs);
        }
    }
    console.log($scope.msgs);
    //$scope.mlength = $scope.msgs.length;

});


//logout controller//

loginapp.controller('logoutcontroller', function($scope, $location){
    localStorage.removeItem('user_flags');
});




