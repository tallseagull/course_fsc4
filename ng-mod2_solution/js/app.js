(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  // Initialize to having values in our list:
  toBuy.noItemsLeft = false;
  toBuy.checkOffService = ShoppingListCheckOffService;

  toBuy.boughtItem = function (idx) {
    toBuy.checkOffService.boughtItem(idx);
    if (toBuy.checkOffService.getToBuyItems().length===0) {
      toBuy.noItemsLeft = true;
    }
  };

  toBuy.getToBuyItems = function () {
    return toBuy.checkOffService.getToBuyItems();
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  // Initialize to having no values in our bought list:
  alreadyBought.emptyBag = true;
  alreadyBought.checkOffService = ShoppingListCheckOffService;

  alreadyBought.hasNoItems = function () {
    return alreadyBought.checkOffService.getBoughtItems().length === 0;
  };

  alreadyBought.getBoughtItems = function () {
    return alreadyBought.checkOffService.getBoughtItems();
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "nachos", quantity: 5 },
      { name: "coffee", quantity: 3 },
      { name: "apples", quantity: 10 },
      { name: "oranges", quantity: 7 },
      { name: "tomatoes", quantity: 15 }
  ];

  // List of bought items
  var boughtItems = [];

  service.boughtItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1)
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();