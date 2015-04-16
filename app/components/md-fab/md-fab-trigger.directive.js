/**
 * Created by topher on 4/14/15.
 */

(function() {
  function FabTriggerDirective() {
    return {
      restrict: "E",

      compile: function($element, $attrs) {
        var children = $element.children();

        if (children && children.length > 0) {
          var child = angular.element(children[0]);

          if (!child.attr("ng-focus")) {
            child.attr("ng-focus", "vm.focus($event)");
          }

          if (!child.attr("ng-blur")) {
            child.attr("ng-blur", "vm.blur($event)");
          }
        }

        return {};
      }
    }
  }

  FabTriggerDirective.$inject = [];

  angular.module("abbc").directive("mdFabTrigger", FabTriggerDirective);
})();
