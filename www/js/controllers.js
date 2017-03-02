angular.module('starter.controllers', [])

.controller('Menu_Ctrl', function($scope, $state) {

    $scope.reloadHome = function() {
        $state.go('app.home', {}, {reload: true});
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

.controller('Register_Ctrl', function($scope, $state, $http, $ionicHistory, $ionicPopup) {
	$scope.register = function(data){
            $data = data;
			var link = 'http://127.0.0.1/register.php';

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

