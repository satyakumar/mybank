  myBank.config(function($routeProvider) {
      $routeProvider
          .when('/', {
              templateUrl: 'templates/home.html',
              controller: 'homeCtrl',
          })
          .when('/add-customer', {
              templateUrl: 'templates/add-cust.html',
              controller: 'addCustCtrl',
          })
          .when('/cust-register', {
              templateUrl: 'templates/cust-register.html',
              controller: 'custRegCtrl',
          })
          .when('/cust-login', {
              templateUrl: 'templates/cust-login.html',
              controller: 'custLoginCtrl',
          })
          .when('/customers', {
              templateUrl: 'templates/customers-list.html',
              controller: 'custListCtrl',
          })
          .when('/profile', {
              templateUrl: 'templates/cust-profile.html',
              controller: 'custProfileCtrl',
          })
          .when('/logout', {
              templateUrl: 'templates/logout.html',
              controller: 'logOutCtrl'
          })
          .when('/manager-login', {
              templateUrl: 'templates/manager-login.html',
              controller: 'mngrLoginCtrl'
          })
          .when('/manager-dashboard', {
              templateUrl: 'templates/manager-dashboard.html',
              controller: 'mngrDashboardCtrl'
          })
          .when('/transfer-requests', {
              templateUrl: 'templates/fund-transfer-requests.html',
              controller: 'fundTransReqCtrl'
          })
          .when('/add-customer',{
            templateUrl: 'templates/add-customer.html',
            controller: 'addCustCrtl'
          })
  });