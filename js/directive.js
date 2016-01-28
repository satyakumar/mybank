myBank.directive('custBlock', function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'templates/cust-block.html',
        scope: {
            cust: '=',
            hideFun: '&',
        }
    }
});
myBank.directive('custList', function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'templates/cust-list.html',
        scope: {
            custListObj: '=',
            custShowFun: '&',
            custEditFun: '&',
            custDelFun: '&',
        }
    }
});
myBank.directive('custEdit', function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'templates/cust-edit.html',
        scope: {
            custEditObj: '=',
            custEditFun: '&',
        }
    };
});
myBank.directive('loginTemp', function() {
    return {
        restrict: 'AE',
        replace: false,
        templateUrl: 'templates/login-temp.html',
        scope: {
            clickFun: '&',
        }
    };
});