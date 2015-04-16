/**
 * Created by topher on 4/15/15.
 */

(function() {
  function FabController() {
    var vm = this;

    vm.focused = false;

    vm.focus = function($event) {
      vm.focused = true;
    };

    vm.blur = function($event) {
      vm.focused = false;
    };
  }

  FabController.$inject = [];

  angular.module("abbc").controller("FabController", FabController);
})();
