/*****Getting customers data from Firebase service***/
myBank.service('getCustList', ['$firebaseArray', function($firebaseArray) {
    /****Firebase***/
    //var ref = new Firebase("https://my-bank.firebaseio.com/customers");
    /****Getting all customers list***/
    //this.list = $firebaseArray(ref);
    /*!!! this.list = $firebaseArray(new Firebase("https://my-bank.firebaseio.com/customers")); !! */
    var users = $firebaseArray(new Firebase("https://my-bank.firebaseio.com/customers"));
    // Getting particular record
    this.getRec = function(id) {
        return users.$getRecord(id);
    }
    this.list = users;
}]);
/*****Add customer service*****/
myBank.service('addCust', ['$location', 'getCustList', function($location, getCustList) {
    this.insertCust = function(user) {
        getCustList.list.$add({
            ac: new Date().getTime(),
            name: user.name,
            email: user.email.toLowerCase(),
            gender: user.gender,
            password: user.password,
            phone: user.phone,
            state: user.state,
            money: 5000,
        }).then(function(ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            getCustList.list.$indexFor(id); // returns location in the array
            $location.path('/cust-login');
        });
    };
}]);
/****Edit customer service***/
myBank.service('editCust', ['$rootScope', '$location', 'getCustList', function($rootScope, $location, getCustList) {
    this.updateCust = function(user) {
        var id = user.$id;
        var record = getCustList.getRec(id);
        record.name = user.name;
        record.email = user.email.toLowerCase();
        record.gender = user.gender;
        record.password = user.password;
        record.phone = user.phone;
        record.state = user.state;
        getCustList.list.$save(record).then(function(ref) {
            //console.log(ref.key, ' updated');
        });
        return true;
    };
}]);
/*****Login customer service******/
myBank.service('loginService', ['$location', 'getCustList', function($location, getCustList) {
    this.login = function(user) {
        var userObj = {};
        getCustList.list.forEach(function(key) {
            //console.log(user,key);
            if (key.email.toLowerCase() === user.email.toString().toLowerCase() && key.password === user.password.toString()) {
                userObj = key;
            }
        });
        return userObj;
    };
}]);
/******Adding money to account*****/
myBank.service('addMoney', ['getCustList', function(getCustList) {
    this.add = function(money, id, existMonery) {
        var record = getCustList.getRec(id);
        record.money = Number(money) + Number(existMonery);
        getCustList.list.$save(record).then(function(ref) {
            //console.log(ref.key, ' updated');
        });
        return record.money;
    }
}]);
/****Get user cookie****/
myBank.service('getCookie', ['$cookieStore', function($cookieStore) {
    this.profileCookie = $cookieStore.get('customer');
}]);
/****Send money transfer request to manager******/
myBank.service('transferMoney', ['$firebaseArray', function($firebaseArray) {
    var transferData = $firebaseArray(new Firebase("https://my-bank.firebaseio.com/money-transfer-requests"));
    this.transfer = function(money, fromAc, toAc) {
        //console.log(money, fromAc, toAc)
        transferData.$add({
            fromAc: fromAc,
            fromAcId: fromAc.$id,
            toAc: toAc,
            toAcId: toAc.$id,
            money: money,
            created: new Date().getTime(),
            updated: 0,
            status: 0,
        }).then(function(ref) {
            var id = ref.key();
            console.log("Fund transfer request has been added with id: " + id);
        });
        return true;
    }
}]);
/********Getting Fund Transfer requests data**********/
myBank.service('getFundTransReqService', ['$firebaseArray', function($firebaseArray) {
    this.transferRequests = $firebaseArray(new Firebase("https://my-bank.firebaseio.com/money-transfer-requests"));
}]);
/*********Accept/Deny Money Transfer Requests**********/
myBank.service('fundTransActionService',['$firebaseArray','getFundTransReqService','getCustList',function($firebaseArray,getFundTransReqService,getCustList){
    this.action = function(matchRec,action) {
        var transRecord = getFundTransReqService.transferRequests.$getRecord(matchRec.$id);
        transRecord.status = action;
        transRecord.updated = new Date().getTime();
        if(action === 1) {
            var fromAcRec = getCustList.getRec(matchRec.fromAcId);
            var toAcRec = getCustList.getRec(matchRec.toAcId);  
            var toAddMoney = toAcRec.money + matchRec.money;
            var fromDeductMoney = fromAcRec.money - matchRec.money;
            fromAcRec.money = fromDeductMoney;
            toAcRec.money = toAddMoney;
            getCustList.list.$save(fromAcRec).then(function(ref) {
               console.log('From ac has been updated'); 
            });
            getCustList.list.$save(toAcRec).then(function(ref) {
               console.log('To ac has been updated'); 
            });
        }
        getFundTransReqService.transferRequests.$save(transRecord).then(function(ref) {
           console.log('Transfer record has been updated'); 
        });
        return true; 
    }
}]);
/*********Getting user record based on the $id**************/
//myBank.service('getUserRecService',['']);
 