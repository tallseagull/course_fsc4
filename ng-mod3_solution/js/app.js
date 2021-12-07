(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowIt = this;

  // Initialize to having values in our list:
  narrowIt.found = [];
  narrowIt.search = "";
  narrowIt.menuSearchService = MenuSearchService;

  narrowIt.updateItems = function () {
    narrowIt.menuSearchService.getMatchedMenuItems(narrowIt.search)
        .then(function (foundItems) {
          narrowIt.found = foundItems;
        });
  };

  narrowIt.remove = function (idx) {
    narrowIt.found.splice(idx, 1);
  };
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];
      var menuItems = result.data.menu_items;

      console.log("Searching for " + searchTerm);
      for (let i=0; i < menuItems.length ; i++) {
        if (menuItems[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
          foundItems.push(menuItems[i]);
        }
      }
      // return processed items
      return foundItems;
    });
  };

}

})();