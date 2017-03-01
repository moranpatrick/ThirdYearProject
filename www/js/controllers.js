angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {



})

.controller('Home_Page_Ctrl', function($scope, $ionicModal, $timeout) {
    //Sliding images acting as a gallery on home page
    $scope.slide_items=[{"p_image_id":"dj"}, {"p_image_id":"dj1"}, {"p_image_id":"dj3"}];
    /*Function to open default email client on phone and prepare an email*/
    $scope.sendEmail= function() {
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

.controller('Shout_Outs_Ctrl', function($scope, $http, $ionicPopup) {
      
    $scope.send_shout_out= function(data) {
        //console.log("Sending Shout Out!!");
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

