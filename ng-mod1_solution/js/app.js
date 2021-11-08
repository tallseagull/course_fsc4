(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  $scope.lunchList = "";
  $scope.lunchMessage = "";
  $scope.checkLunch = function () {
    let lunchItems = $scope.lunchList.split(',');

    if ($scope.lunchList==='') {
      $scope.lunchMessage = "Please enter data first";
    }
    else if (lunchItems.length <= 3) {
      $scope.lunchMessage = "Enjoy!";
    }
    else {
      $scope.lunchMessage = "Too much!";
    }
  };
}

})();
