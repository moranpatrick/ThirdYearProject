angular.module('starter.controllers', [])


.controller('Menu_Ctrl', function($scope, $state, $ionicHistory) {
    
    $scope.$on('LOAD', function(){$scope.loading = true});
    $scope.$on('UNLOAD', function(){$scope.loading = false});

    $scope.reloadHome = function() {
        $state.go('app.home', {}, {reload: true});

        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            reload: true
        });
    }
})

.controller('Home_Page_Ctrl', function($scope, $ionicModal, $timeout) {
    //Sliding images acting as a gallery on home page
    $scope.slide_items = [{"p_image_id":"dj"}, {"p_image_id":"dj1"}, {"p_image_id":"dj3"}];
    /*Function to open default email client on phone and prepare an email*/
    $scope.sendEmail = function() {
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "Feedback From App", // Subject
            "Hi, ",                      // Body
            ["djgarrylee@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }//if
    }

})//Home_Page_Ctrl

.controller('Bookings_Ctrl', function($scope, $ionicPopup, $http, $state) {

    $scope.make_booking = function(data) {
        $scope.data = data;
        $scope.url = 'http://127.0.0.1/sendmail.php';

        
        //console.log("Email: " + $scope.data.email + "\nNumber: " + $scope.data.telephone + "\nMessage: " + $scope.data.message);
        $scope.$emit('LOAD');
        $http.post($scope.url, {"email": $scope.data.email, "telephone": $scope.data.telephone, "message": $scope.data.message}).
                success(function(data, status) {
                    console.log("Success Returned");
                    console.log(data);
                   $scope.$emit('UNLOAD');
                    //Clear The input fields
                    $scope.data.email = "";
                    $scope.data.telephone = "";  
                    $scope.data.message = "";  
                    
                    var alertPopup = $ionicPopup.alert({
						title: 'Enquiry Sent!',
						template: 'You will be hearing from DJ Lee shortly!'
					});

					$state.go('app.home', {}, {reload: true});

                }).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Oops!',
						template: 'Something went wrong!'
					});
			});
    }//make_booking()

})//Home_Page_Ctrl

.controller('Login_Ctrl', function($scope, $http, $state, $ionicHistory, $ionicPopup) {

    $scope.data = {};

    $scope.login = function() {
        //console.log("In Login: " + $scope.data.username + " " + $scope.data.password)

        str="http://127.0.0.1/login.php?e="+$scope.data.email+"&p="+$scope.data.password;
        $http.get(str)
			.success(function (response){
				$scope.user_details = response.records;
                console.log("Login Sucessful");
				sessionStorage.setItem('loggedin_name', $scope.user_details.username);
				sessionStorage.setItem('loggedin_id', $scope.user_details.email);
			
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

                $state.go('app.home', {}, {location: "replace", reload: true});

			}).error(function() {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials and Try Again!'
					});
			});
    }//login()

})//Home_Page_Ctrl

.controller('Register_Ctrl', function($scope, $state, $http, $ionicHistory, $ionicPopup) {
	$scope.register = function(data){
            $data = data;
			var link = 'http://127.0.0.1/register.php';
            //var link = 'http://52.25.228.105/register.php';
            $http.post(link, {e : data.email, u : data.username, p : data.password})
			.then(function (res){	
				$scope.response = res.data.result; 
				
                if($scope.response.success == "1"){
					$scope.title = "Success!";
					$scope.template = "Your account has been successfully created!";
					
					//no back option
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});
                    
                    //Clear The input fields
                    $data.email = "";
                    $data.username = "";  
                    $data.password = "";  

					$state.go('app.login', {}, {reload: true});
				
				}else if($scope.response.exists == "1"){
					$scope.title = "Email Already exists";
					$scope.template = "We allready have a record of this email address in our database";
				
				}else{
					$scope.title = "Oops!";
					$scope.template = "Something went wrong please Contact us for techical assisstance";
				}
				
				var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.template
				});
						
			});			
	}//register()

})//Register_Ctrl

.controller('Shout_Outs_Ctrl', function($scope, $http, $ionicPopup) {
      
    $scope.send_shout_out= function(data) {

        $data = data;
        //var link = 'http://52.25.228.105/shout_out.php';
        var link = 'http://127.0.0.1/shout_out.php';

        $http.post(link, {n : data.name, m : data.message })
		    .then(function (res){	
				
                $scope.response = res.data.result; 
                //Evaluate Response
                if($scope.response.inserted == "1"){
                    $scope.title = "Message Sent!";
					$scope.message = "Your Message has been sent!";
                }
                else if($scope.response.inserted == "0"){
                    $scope.title = "OOPS!";
					$scope.message = "Something Went Wrong - Your Message Was not Sent!";
                }

                //Show alert to the user - success or failure
                var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.message
				});
                 
                //Clear The input fields
                $data.name = "";
                $data.message = "";      
        });

    }//shout_out_function

});//Shout_Outs_Ctrl

