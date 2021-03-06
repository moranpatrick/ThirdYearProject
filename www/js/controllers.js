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
            } 
        });  
    };//selectSong()

    //Reload Home
    $scope.reloadHome = function(){
        $state.go('app.home', {}, {reload: true});
        $ionicHistory.nextViewOptions({
            reload: true
        });
    };
})//App_Ctrl

.controller('Home_Page_Ctrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state) {
    //Sliding images acting as a gallery on home page
    $scope.slide_items = [{"p_image_id":"dj"}, {"p_image_id":"dj1"}, {"p_image_id":"dj3"}];
    /*Function to open default email client on phone and prepare an email*/
    
    /* https://www.thepolyglotdeveloper.com/2014/08/send-email-android-ios-ionicframework/ */
    $scope.sendEmail = function() {
        /* This function launches default email client and populates fields */
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
        
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
        /* Pass through Data from form to use with php mailer */
        $http.post($scope.url, {"email": $scope.data.email, "telephone": $scope.data.telephone, "message": $scope.data.message}).
                success(function(data, status) {
                    //Stop the loading Icon
                    $scope.$emit('UNLOAD');
                    $scope.$emit('BUT_ON');
                    //Clear The input fields
                    $scope.data.email = "";
                    $scope.data.telephone = "";  
                    $scope.data.message = "";  
                    //Successs
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
        // Pass through users username and password to match with database 
        str = "http://52.25.228.105/login.php?e="+$scope.data.email+"&p="+$scope.data.password;
        $http.get(str)
			.success(function (response){
                //Successful Login
                $scope.$emit('UNLOAD');
                $scope.$emit('BUT_ON');

				$scope.user_details = response.records;
				sessionStorage.setItem('loggedin_username', $scope.user_details.username);
				sessionStorage.setItem('loggedin_email', $scope.user_details.email);                
                
				$ionicHistory.nextViewOptions({
					disableBack: true,
                    reload: true
				});
                //Check if its admin or user
                if($scope.user_details.email == "djgarrylee@gmail.com"){
                    //Admin User Logged in
                    $state.go('app.admin_home', {}, {reload: true});
                    location.reload();
                }
                else{
                    //Normal User Logged in
                    $state.go('app.home', {}, {reload: true});
                    location.reload();
                }
			}).error(function() {
                    //Wrong Details
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
        //Pass through all users details to php script so they can be added to the database
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
        //Pass through users name and message so it can be saved in the database
        $http.post(link, {n : data.name, m : data.message }).then(function (res){				
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
    $scope.loggedin_username = sessionStorage.getItem('loggedin_username');
	$scope.loggedin_email = sessionStorage.getItem('loggedin_email');

    $scope.logout = function(){
        /* Logs out the user */
        delete sessionStorage.loggedin_username;
        delete sessionStorage.loggedin_email;
        /* Clear Cache */
        $ionicHistory.clearCache();         
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.login', {}, {location: "replace", reload: true});
    }; 

    $scope.contact_dev = function() {
        /* This method launches default email client and populates fields */
        /* https://www.thepolyglotdeveloper.com/2014/08/send-email-android-ios-ionicframework/ */
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                
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
})//User_Profile_Ctrl

.controller('Recent_Hits_Ctrl', function($scope, $http, load_playlists, $ionicPopup, $state, $timeout) {
    $scope.noMoreItemsAvailable = false;   
    //loads the menu----onload event
	$scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();  //Added Infine Scroll
	});	 
	// Loadmore() called inorder to load the list 
	$scope.loadMore = function() {
		str = load_playlists.getUrl("charts");
			
        $http.get(str).success(function (response){
            $scope.chart_list = response.records;
			$scope.hasmore = response.has_more;	
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
			$scope.hasmore = response.has_more;	
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
})//RnB_Controller

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

.controller('70s_Ctrl', function($scope, $http, load_playlists, $ionicPopup, $state, $timeout) {
    $scope.noMoreItemsAvailable = false; // lazy load list   
	$scope.$on('$stateChangeSuccess', function() {
		$scope.loadMore();  //Added Infine Scroll
	});
	 
	// Loadmore() called in order to load the list 
	$scope.loadMore = function() {
		str = load_playlists.getUrl("_70_80_90");
			
        $http.get(str).success(function (response){
            $scope.seventies_list = response.records;
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
})//70s_Ctrl

.controller('Admin_Home_Ctrl', function(load_admin, $scope, $http, $ionicHistory, $state) {    

	$scope.$on('$stateChangeSuccess', function() {
        //Every Time the State Changes Successfully Reload Totals
        $scope.reloadAdminTotals();  
	});

    $scope.reloadAdminTotals = function(){
        str = load_admin.getUrl();
			
        $http.get(str).success(function (response){
            $scope.tot1 = response.shout_outs;
            $scope.tot2 = response.songRequests;
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function() {
            $scope.$broadcast('scroll.refreshComplete');
        })
    }

    $scope.admin_logout = function(){
        //Logs the admin out
        delete sessionStorage.loggedin_username;
        delete sessionStorage.loggedin_email;
        //Clear Cache
        $ionicHistory.clearCache();       
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.login', {}, {reload: true});
    };

})//Admin_Home_Ctrl

.controller('Admin_ShoutOuts_Ctrl', function(load_admin_shoutOuts, $scope, $http, $filter, $state, $ionicHistory, $ionicListDelegate, $ionicPopup, $window) {
    
    //Load Shout Outs Every Time The state changes
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadShoutOuts();  
	});
    
    $scope.loadShoutOuts = function(){
        $scope.$emit('LOAD');
        load_admin_shoutOuts.get()
        .success(function(response) {
            $scope.shout_outs = response.shout_outs;
            /*Convert All SQL TimeStamp Dates to a format like ISO 8601 so angular can filter the date nicely
            Code for this: http://stackoverflow.com/questions/20709910/unable-to-format-default-mysql-datetime#answer-20710074 */
            for(var i = 0; i < $scope.shout_outs.length; i++){        
                $scope.shout_outs[i].inserted = new Date($scope.shout_outs[i].inserted).toISOString();
            }
            $scope.$emit('UNLOAD');
        }).error(function() {
            $scope.$emit('UNLOAD');
        });
    };

    $scope.reloadAdminHome = function(){
        $state.go('app.admin_home', {}, {reload: true});
        $ionicHistory.nextViewOptions({
            disableBack: true,
            reload: true
        });
    };

    $scope.deleteShoutOut = function(item){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Shout Out',
            template: 'Are you sure you want to delete this Shout Out From ' + item.name + '?'
        });

        confirmPopup.then(function(res) {
            $scope.$emit('LOAD');
            if(res) {
                var link = 'http://52.25.228.105/deleteShoutOut.php';
                
                $http.post(link, {i : item.id}).then(function (res){
                    $scope.response = res.data.result;               
                    $scope.$emit('UNLOAD');
                    //Evaluate Response
                    if($scope.response.deleted == "1"){
                        //Deleted Successfully - Refresh Page
                        $window.location.reload(true);
                    }
                    else if($scope.response.deleted == "0"){
                        var alertPopup = $ionicPopup.alert({
                            title: "Oops!!",
                            template: "Something went Wrong - Please Try Again"
                        }); 
                    }

                }, function errorCallback(response) {
                    $scope.$emit('UNLOAD');
                    var alertPopup = $ionicPopup.alert({
                        title: "Oops!!",
                        template: "Something went Wrong - Please Try Again"
                    }); 
                });              
                $ionicListDelegate.closeOptionButtons();                        
            } else {
                $scope.$emit('UNLOAD');
                $ionicListDelegate.closeOptionButtons();
            }
        });  
    }//Delete A ShoutOut
})//admin_Shout_Outs_Ctrl

.controller('Admin_SongRequests_Ctrl', function(load_admin_songRequests, $scope, $http, $state, $ionicHistory, $ionicPopup, $window, $ionicListDelegate) {
    
    $scope.$emit('LOAD');
    //Load Song Requests Every Time The state changes
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadSongRequests();  
	});

    $scope.loadSongRequests = function(){
        load_admin_songRequests.get()
        .success(function(response) {
            $scope.song_requests = response.song_requests;
            //Convert to an angular date
            for(var i = 0; i < $scope.song_requests.length; i++){        
                $scope.song_requests[i].inserted = new Date($scope.song_requests[i].inserted).toISOString();
            }
            $scope.$emit('UNLOAD');
        }).error(function() {
            $scope.$emit('UNLOAD');
        });
    };

    $scope.deleteSongRequest = function(item){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Song Request',
            template: 'Are you sure you want to delete this Song Request: ' + item.title + ' By: ' + item.artist + '?'
        });

        confirmPopup.then(function(res) {
            $scope.$emit('LOAD');
            if(res) {
                var link = 'http://52.25.228.105/deleteSongRequest.php';
                
                $http.post(link, {i : item.id}).then(function (res){
                    $scope.response = res.data.result;               
                    $scope.$emit('UNLOAD');
                    //Evaluate Response
                    if($scope.response.deleted == "1"){
                        //Deleted Successfully - Refresh Page
                        $window.location.reload(true);
                    }
                    else if($scope.response.deleted == "0"){
                        var alertPopup = $ionicPopup.alert({
                            title: "Oops!!",
                            template: "Something went Wrong - Please Try Again"
                        }); 
                    }

                }, function errorCallback(response) {
                    $scope.$emit('UNLOAD');
                    var alertPopup = $ionicPopup.alert({
                        title: "Oops!!",
                        template: "Something went Wrong - Please Try Again"
                    }); 
                });              
                $ionicListDelegate.closeOptionButtons();                        
            } else {
                $scope.$emit('UNLOAD');
                $ionicListDelegate.closeOptionButtons();
            }
        });  
    };//Delete A Song Request

    $scope.reloadAdminHome = function(){
        $state.go('app.admin_home', {}, {reload: true});
        $ionicHistory.nextViewOptions({
            disableBack: true,
            reload: true
        });
    };
});//admin_songRequestsCtrl

