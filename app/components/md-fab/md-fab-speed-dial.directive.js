/**
 * Created by topher on 4/14/15.
 */

(function() {
  function FabSpeedDialDirective() {
    return {
      restrict: "E",

      compile: function($element, $attrs) {
        $element.attr("layout", "column");
        $element.attr("layout-align", "center center");

        var children = $element.children(),
          i, child;

        for (i = 0; i < children.length; i++) {
          if (children[i].tagName) {
            child = angular.element(children[i]);

            if (!child.attr("ng-focus")) {
              child.attr("ng-focus", "vm.focus($event)");
            }

            if (!child.attr("ng-blur")) {
              child.attr("ng-blur", "vm.blur($event)");
            }
          }
        }

        return {};
      }
    }
  }

  FabSpeedDialDirective.$inject = [];

  angular.module("abbc").directive("mdFabSpeedDial", FabSpeedDialDirective);
})();
