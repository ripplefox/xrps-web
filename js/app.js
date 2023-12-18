var shApp = angular.module('foxhome', ['pascalprecht.translate']);

shApp.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('cn', translate_cn);
	$translateProvider.translations('en', translate_en);
	$translateProvider.preferredLanguage('cn');
	$translateProvider.useSanitizeValueStrategy('escape');
}]);

shApp.run(['$rootScope', '$window', '$translate',function($rootScope, $window, $translate) {
	let key = $window.localStorage['lang'] || 'cn';
	$translate.use(key);
	$rootScope.lang = $translate.use();
}]);

shApp.factory('SettingFactory', function($window) {
	return {
		setLang : function(lang) {
			$window.localStorage['lang'] = lang;
		},
		getLang : function() {
			return $window.localStorage['lang'] || 'cn';
		}
	};
});

shApp.controller("LangCtrl", [ '$scope', '$rootScope', '$translate', 'SettingFactory',
  function($scope, $rootScope, $translate, SettingFactory) {
  $rootScope.lang = $translate.use();
	$scope.changeLanguage = function (key) {
      $translate.use(key);
      $rootScope.lang = $translate.use();
	    SettingFactory.setLang(key);
	};
}]);

shApp.controller("XlmGatewayCtrl", [ '$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
  $scope.deposit = [];
  $scope.withdraw = [];
  
  $http({
    method: 'GET',
    url: "https://ripplefox.com/data/history/stellar2ripple"
  }).then(function(res) {
    console.log(res.data);
    $scope.deposit = res.data.data;
  }).catch(err => {
    console.log('ignore version check', err);
  });
  
  $http({
    method: 'GET',
    url: "https://ripplefox.com/data/history/ripple2stellar"
  }).then(function(res) {
    console.log(res.data);
    $scope.withdraw = res.data.data;
  }).catch(err => {
    console.log('ignore version check', err);
  });
}]);

shApp.filter('shortaddress', function() {
  return function(address) {
    if (!address || address.length < 8) {
      return address;
    }
    var start = address.substring(0, 4);
    var end = address.substring(address.length - 4);
    return start + '...' + end;
  }
});
