// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'App_Ctrl',

  })

  .state('app.login', {
    parent: 'app',
    url: '/login',
    views: {
      'appContent': {
        templateUrl: 'templates/login.html',
        controller: 'Login_Ctrl'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'appContent': {
        templateUrl: 'templates/register.html',
        controller: 'Register_Ctrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu_user.html',
        controller: 'Home_Page_Ctrl',
      },
      'appContent':{
        templateUrl: 'templates/home.html',
        controller: 'Home_Page_Ctrl',
      }
    }
  })

  .state('app.requests', {
    url: '/requests',
    views: {
      'appContent': {
        templateUrl: 'templates/requests.html',
      }
    }//views
  })

  .state('app.shout_outs', {
    url: '/shout_outs',
    views: {
      'appContent': {
        templateUrl: 'templates/shout_outs.html',
        controller: 'Shout_Outs_Ctrl',

      }
    }
  })

  .state('app.bookings', {
    url: '/bookings',
    views: {
      'appContent': {
        templateUrl: 'templates/bookings.html',
        controller: 'Bookings_Ctrl',
      }
    }
  })
  
  .state('app.user_profile', {
    url: '/user_profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu_user.html',
        controller: 'User_Profile_Ctrl',
      },
      'appContent': {
        templateUrl: 'templates/user_profile.html',
        controller: 'User_Profile_Ctrl'
      }
    }
  })
  /* States for Genres */
  .state('app.recent_hits', {
    url: '/recent_hits',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu_user.html',
        controller: 'Recent_Hits_Ctrl',
      },
      'appContent': {
        templateUrl: 'templates/recent_hits.html',
        controller: 'Recent_Hits_Ctrl'
      }
    }
  })
  
  .state('app.rock', {
    url: '/rock',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu_user.html',
        controller: 'Rock_Ctrl',
      },
      'appContent': {
        templateUrl: 'templates/rock.html',
        controller: 'Rock_Ctrl',
      },
    }
  })

  .state('app.rnb', {
    url: '/rnb',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu_user.html',
        controller: 'R_n_B_Ctrl',
      },
      'appContent': {
        templateUrl: 'templates/rnb.html',
        controller: 'R_n_B_Ctrl',
      }
    }
  })
  
  .state('app.70s80s90s', {
    url: '/70s80s90s',
    views: {
      'menuContent': {
        templateUrl: 'templates/menu_user.html',
        controller: '70s_Ctrl',
      },
      'appContent': {
        templateUrl: 'templates/70_80_90.html',
        controller: '70s_Ctrl',
      }
    }
  })


  /* Admin Pages */
  .state('app.admin_home', {
      url: '/admin_home',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu_admin.html',
          controller: 'Admin_Home_Ctrl'
        },
        'appContent': {
          templateUrl: 'templates/admin_home.html',
          controller: 'Admin_Home_Ctrl'
        }
      }
  })

  .state('app.admin_shout_outs', {
      url: '/admin_shout_outs',
      views: {
        'menuContent':{
          templateUrl: 'templates/menu_admin.html',
          controller: 'Admin_Home_Ctrl'
        },
        'appContent': {
          templateUrl: 'templates/admin_shout_outs.html',
          controller: 'Admin_ShoutOuts_Ctrl'
        }
      }
  })

  .state('app.admin_songRequests', {
      url: '/admin_songRequests',
      views: {
        'menuContent':{
          templateUrl: 'templates/menu_admin.html',
          controller: 'Admin_Home_Ctrl'
        },
        'appContent': {
          templateUrl: 'templates/admin_songRequests.html',
          controller: 'Admin_SongRequests_Ctrl'
        }
      }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
