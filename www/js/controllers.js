angular.module('starter.controllers', [])

.controller('App_Ctrl', function($scope, $state, $ionicHistory, $ionicPopup, $http) {

    /* Ion Spinner Handling */
    $scope.$on('LOAD', function(){$scope.loading = true});
    $scope.$on('UNLOAD', function(){$scope.loading = false});

    /* Button ON/OFF Handling */
    $scope.$on('BUT_ON', function(){$scope.show_button = false});
    $scope.$on('BUT_OFF', function(){$scope.show_button = true});

    /* Handle Song voting */
    $scope.selectSong = function(item) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Vote to Hear',
            template: 'Are you sure you want to vote for ' + item.title + '?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                var link = 'http://52.25.228.105/user_choice.php';
                
                $http.post(link, {a : item.artist, t : item.title, g : item.genre}).then(function (res){
                    $scope.response = res.data.result; 

                    //Evaluate Response
                    if($scope.response.inserted == "1"){
                        $scope.title = "Done!";
                        $scope.message = "Your Vote has been cast!";
                    }
                    else if($scope.response.inserted == "0"){
                        $scope.title = "OOPS!";
                        $scope.message = "Something Went Wrong - Please Try again!";
                    }

                    //Show alert to the user - success or failure
                    var alertPopup = $ionicPopup.alert({
                        title: $scope.title,
                        template: $scope.message
                    }); 
                });

            } else {
                console.log('You are not sure');
            }
        });  

    };//selectSong()

    //Reload Home
    $scope.reloadHome = function(){
        console.log("home");

        $state.go('app.home', {}, {reload: true});
        $ionicHistory.nextViewOptions({
            disableBack: true,
            reload: true
        });
    };
})//App_Ctrl

.controller('Home_Page_Ctrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state) {
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
        $scope.url = 'http://52.25.228.105/sendmail.php';

        $scope.$emit('LOAD');
        $scope.$emit('BUT_OFF');

        $http.post($scope.url, {"email": $scope.data.email, "telephone": $scope.data.telephone, "message": $scope.data.message}).
                success(function(data, status) {
                    //Stop the loading Icon
                    $scope.$emit('UNLOAD');
                    $scope.$emit('BUT_ON');
                    //Clear The input fields
                    $scope.data.email = "";
                    $scope.data.telephone = "";  
                    $scope.data.message = "";  
                    
                    var alertPopup = $ionicPopup.alert({
						title: 'Enquiry Sent!',
						template: 'You will be hearing from DJ Lee shortly!'
					});

					$state.go('app.home');

                }).error(function() {
                    $scope.$emit('UNLOAD');
                    $scope.$emit('BUT_ON');
                    $scope.data.email = "";
                    $scope.data.telephone = "";  
                    $scope.data.message = "";  
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
        $scope.$emit('BUT_OFF');
        $scope.$emit('LOAD');

        str="http://52.25.228.105/login.php?e="+$scope.data.email+"&p="+$scope.data.password;
        $http.get(str)
			.success(function (response){
                $scope.$emit('UNLOAD');
                $scope.$emit('BUT_ON');
				$scope.user_details = response.records;
                console.log("Login Sucessful");
				sessionStorage.setItem('loggedin_username', $scope.user_details.username);
				sessionStorage.setItem('loggedin_email', $scope.user_details.email);
                
                //console.log($scope.user_details.username);
                
				$ionicHistory.nextViewOptions({
					disableBack: true,
                    reload: true
				});
                
                if($scope.user_details.email == "djgarrylee@gmail.com"){
                    console.log("Admin User Logged in");
                    window.location.href = "/#/admin_home";
                    location.reload();

                }
                else{
                    console.log("Normal User Logged in");
                    window.location.href = "/#/app/home";
                    location.reload();

                }

			}).error(function() {
                    $scope.$emit('UNLOAD');
                    $scope.$emit('BUT_ON');

					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials and Try Again!'
					});
			});
    }//login()

})//Login_Ctrl

.controller('Register_Ctrl', function($scope, $state, $http, $ionicHistory, $ionicPopup) {
	$scope.register = function(data){
        $scope.$emit('BUT_OFF');
        $scope.$emit('LOAD');
        $data = data;
        
        //var link = 'http://127.0.0.1/register.php';
        var link = 'http://52.25.228.105/register.php';
        $http.post(link, {e : data.email, u : data.username, p : data.password})
        .then(function (res){	
            $scope.response = res.data.result; 
            
            if($scope.response.success == "1"){
                $scope.title = "Success!";
                $scope.template = "Your account has been successfully created!";
                
                //no back option
                $ionicHistory.nextViewOptions({
                    //disableAnimate: true,
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
            $scope.$emit('UNLOAD');
            $scope.$emit('BUT_ON');
            
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
        var link = 'http://52.25.228.105/shout_out.php';
        //var link = 'http://127.0.0.1/shout_out.php';

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

})//Shout_Outs_Ctrl

.controller('User_Profile_Ctrl', function($scope, $state, $ionicHistory) {
	console.log("In profile ctrl");
    $scope.loggedin_username = sessionStorage.getItem('loggedin_username');
	$scope.loggedin_email = sessionStorage.getItem('loggedin_email');

    $scope.logout = function(){
            console.log("logging out");
            delete sessionStorage.loggedin_username;
            delete sessionStorage.loggedin_email;

            $ionicHistory.clearCache();
            
            $ionicHistory.nextViewOptions({
                //disableAnimate: true,
                disableBack: true
            });
            $state.go('app.login', {}, {location: "replace", reload: true});
    }; 

    $scope.contact_dev = function() {
        console.log("contact dev");
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "Feedback From App", // Subject
            "Hi, ",                      // Body
            ["patrickmoran121@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }//if
    }//contact_dev()

})//Shout_Outs_Ctrl

.controller('Recent_Hits_Ctrl', function($scope, $http, load_playlists, $ionicPopup, $state, $timeout) {
    $scope.noMoreItemsAvailable = false; // lazy load list   
    //loads the menu----onload event
	$scope.$on('$stateChangeSuccess', function() {
		console.log("Loadmore();");
        $scope.loadMore();  //Added Infine Scroll
	});
	 
	// Loadmore() called inorder to load the list 
	$scope.loadMore = function() {
		str = load_playlists.getUrl("charts");
			
        $http.get(str).success(function (response){
            $scope.chart_list = response.records;
			$scope.hasmore = response.has_more;	//"has_more": 0	or number of items left
			$scope.$broadcast('scroll.infiniteScrollComplete');

		}).error(function() {
            var alertPopup = $ionicPopup.alert({
				title: 'Error Loading Data!',
				template: 'Something went wrong!'
			});
            $state.go('app.home', {}, {reload: false});
		});
			
        //more data can be loaded or not
        if ( $scope.hasmore == 0 ) {
            $scope.noMoreItemsAvailable = true;
        }
	};
})//Recent_Hits_Ctrl

.controller('R_n_B_Ctrl', function($scope, $http, load_playlists, $ionicPopup, $state, $timeout) {
    $scope.noMoreItemsAvailable = false; // lazy load list   
	$scope.$on('$stateChangeSuccess', function() {
		$scope.loadMore();  //Added Infine Scroll
	});
	 
	// Loadmore() called inorder to load the list 
	$scope.loadMore = function() {
		str = load_playlists.getUrl("RnB");
			
        $http.get(str).success(function (response){
            $scope.rnb_list = response.records;
			$scope.hasmore = response.has_more;	//"has_more": 0	or number of items left
			$scope.$broadcast('scroll.infiniteScrollComplete');

		}).error(function() {
            var alertPopup = $ionicPopup.alert({
				title: 'Error Loading Data!',
				template: 'Something went wrong!'
			});
            $state.go('app.home', {}, {reload: false});
		});
			
        //more data can be loaded or not
        if ( $scope.hasmore == 0 ) {
            $scope.noMoreItemsAvailable = true;
        }
	};
})//Rock_Controller

.controller('Rock_Ctrl', function($scope, $http, load_playlists, $ionicPopup, $state, $timeout) {
    $scope.noMoreItemsAvailable = false; // lazy load list   
	$scope.$on('$stateChangeSuccess', function() {
		$scope.loadMore();  //Added Infine Scroll
	});
	 
	// Loadmore() called inorder to load the list 
	$scope.loadMore = function() {
		str = load_playlists.getUrl("rock");
			
        $http.get(str).success(function (response){
            $scope.rock_list = response.records;
			$scope.hasmore = response.has_more;	//"has_more": 0	or number of items left
            console.log("Has More: " + $scope.hasmore);
			$scope.$broadcast('scroll.infiniteScrollComplete');

		}).error(function() {
            var alertPopup = $ionicPopup.alert({
				title: 'Error Loading Data!',
				template: 'Something went wrong!'
			});
            $state.go('app.home', {}, {reload: false});
		});
			
        //more data can be loaded or not
        if ( $scope.hasmore == 0 ) {
            $scope.noMoreItemsAvailable = true;
        }
	};
})//Rock_Controller

.controller('Admin_Home_Ctrl', function(load_admin, $scope, $http) {
    load_admin.get()
    .success(function(response) {
        $scope.tot1 = response.shout_outs;
        $scope.tot2 = response.songRequests;
    }).error(function() {
        console.log("Error!");
    });

});//Rock_Controller



