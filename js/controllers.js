myBank.controller('homeCtrl', ['$scope', '$location', 'getCookie', function($scope, $location, getCookie) {
    if (typeof(getCookie.profileCookie) === 'object') {
        $location.path('/profile');
    }
}]);
myBank.controller('addCustCtrl', ['$scope', function($scope) {

}]);
myBank.controller('custRegCtrl', ['$scope', 'addCust', function($scope, addCust) {
    $scope.myForm = function(user) {
        if (user.email === '' || user.gender === '' || user.name === '' || user.password === '' || user.password2 === '' || user.phone === "" || user.state === '' || user.email === undefined || user.gender === undefined || user.name === undefined || user.password === undefined || user.password2 === undefined || user.phone === undefined || user.state === undefined) {
            $scope.formErr = true;
            console.log('err');
            return false;
        }
        addCust.insertCust(user);
    };
}]);
myBank.controller('custLoginCtrl', ['$scope', '$timeout', '$location', '$cookieStore', 'loginService', function($scope, $timeout, $location, $cookieStore, loginService) {
    $scope.custLogin = function(user) {
        var result = loginService.login(user);
        if (Object.keys(result).length === 0) {
            console.log('errrrrrrr')
            $scope.loginErr = true;
            $timeout(function() {
                $scope.loginErr = false;
            }, 3000);
            return false;
        } else {
            //$scope.customer = result;
            $cookieStore.put('customer', result);
            $location.path('/profile');
        }
    };
}]);
myBank.controller('custListCtrl', ['$scope', '$location', '$timeout', 'getCustList', 'editCust', function($scope, $location, $timeout, getCustList, editCust) {
    $scope.showCustomer = $scope.custEditShow = false;
    $scope.custList = getCustList.list;
    /****Showing a single customer***/
    $scope.custShow = function(customer) {
        $scope.customer = customer;
        $scope.showCustomer = true;
    };
    /****Hiding a customer card***/
    $scope.hide = function() {
        $scope.showCustomer = false;
    };
    /****Edit form of a customer***/
    $scope.custEdit = function(customer) {
        //$location.hash('edit-form');
        $scope.custEditShow = true;
        $scope.showCustomer = false;
        $scope.id = customer.$id;
        $scope.customer = customer;
    };
    /***Process edit form**/
    $scope.updateForm = function(customer) {
        $scope.result = editCust.updateCust(customer);
        if ($scope.result === true) {
            $scope.custEditShow = false;
            $scope.updateAlert = true;
            $timeout(function() {
                $scope.updateAlert = false;
            }, 3000);
        }
    };
    /*****Delete customer****/
    $scope.delCust = function(customer) {
        $scope.custList.$remove(customer);
        $scope.deleteAlert = true;
        $timeout(function() {
            $scope.deleteAlert = false;
        }, 3000);
    };
}]);
/****Customer profile controller**/
myBank.controller('custProfileCtrl', ['$scope', '$timeout', 'editCust', 'addMoney', 'getCookie', '$cookieStore', '$location', 'getCustList', 'transferMoney', function($scope, $timeout, editCust, addMoney, getCookie, $cookieStore, $location, getCustList, transferMoney) {
    $scope.proflEdit = false;
    var custCookie = getCookie.profileCookie;
    if (typeof(custCookie) === 'object') {
        $scope.customer = custCookie;
    } else {
        $scope.profileErr = true;
        return false;
    }
    /******Show edit form*******/
    $scope.profileEdit = function() {
        $scope.proflEdit = true;
    };
    /****Processing edit****/
    $scope.updateForm = function(customer) {
        $scope.result = editCust.updateCust(customer);
        if ($scope.result === true) {
            $scope.proflEdit = false;
            $scope.updateAlert = true;
            $timeout(function() {
                $scope.updateAlert = false;
            }, 3000);
        }
    };
    /****Adding money*****/
    $scope.addMoneyShow = function() {
        $scope.showMoney = true;
    };
    $scope.addMoney = function(money) {
        var result = addMoney.add(money, custCookie.$id, custCookie.money);
        $scope.customer.money = result;
        $scope.showMoney = false;
        $scope.money = '';
    };
    /***Transfer money*****/
    $scope.transferMoneyShow = function() {
        $scope.showTransfer = true;
        $scope.custList = getCustList.list;
    }
    $scope.transfer = function(money, toPayee) {
            if (money > custCookie.money || typeof toPayee === 'undefined') {
                $scope.err = true;
                return false;
            }
            var transferStatus = transferMoney.transfer(money, custCookie, JSON.parse(toPayee));
            console.log(custCookie, JSON.parse(toPayee))
        }
        /*****Logout****/
    $scope.logout = function() {
        $cookieStore.remove('customer');
        $location.path('/logout');
    };
}]);
/*******Manager login controller********/
myBank.controller('mngrLoginCtrl', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
    $scope.login = function(mngr) {
        if (mngr.email === 'mybank@mybank.com' && mngr.password === 'mybank') {
            $location.path('/manager-dashboard');
        } else {
            $scope.loginErr = true;
            $timeout(function() {
                $scope.loginErr = false;
            }, 3000);
            return false;
        }

    }
}]);
/******Manager Dashboard Controller****/
myBank.controller('mngrDashboardCtrl', ['$scope', function($scope) {

}]);
/*******Fund Transfer request page controller********/
myBank.controller('fundTransReqCtrl', ['$scope', 'getFundTransReqService', 'getCustList','fundTransActionService','$timeout', function($scope, getFundTransReqService, getCustList,fundTransActionService,$timeout) {
    $scope.requests = getFundTransReqService.transferRequests;
    $scope.showCustomer = function(acId,acType) {
        $scope.ac = getCustList.getRec(acId);
        $scope.type = acType;
        $scope.acShow = true;
    }
    $scope.transAction = function(id,act) {
        var matchedRecord = '';
        $scope.requests.forEach(function(key) {
            if(key.$id === id) {
                matchedRecord = key;
            }
        });
        var action = fundTransActionService.action(matchedRecord,act); // 1 Means for accept
        if(action) {
            if(act === 1) { $scope.acceptPay = true; }
            else { $scope.denyPay = true; } 
            $timeout(function() {
                $scope.acceptPay = false;
                $scope.denyPay = false;
            }, 3000);
        }
        $scope.acShow = false;
    }
}]);
/********Admin add customer controller*********/
myBank.controller('addCustCrtl',['$scope',function($scope){
    $scope.myForm = function(user) {
        if (user.email === '' || user.gender === '' || user.name === '' || user.password === '' || user.password2 === '' || user.phone === "" || user.state === '' || user.email === undefined || user.gender === undefined || user.name === undefined || user.password === undefined || user.password2 === undefined || user.phone === undefined || user.state === undefined) {
            $scope.formErr = true;
            console.log('err');
            return false;
        }
        addCust.insertCust(user);
    };
}]);
/******Logout controller**/
myBank.controller('logOutCtrl', ['$scope', function($scope) {

}]);