/**
 * Created by topher on 4/14/15.
 */

(function(){
  angular.module("abbc").directive("mdFab", FabDirective);

  function FabDirective() {
    return {
      restrict: "E",
      templateUrl: "components/md-fab/md-fab.template.html",
      transclude: true,

      bindToController: true,
      controller: "FabController",
      controllerAs: "vm"
    }
  }

  FabDirective.$inject = [];
})();