/**
 * Created by topher on 4/14/15.
 */

function UserlandDirective() {
  return {
    restrict: "E",
    templateUrl: "components/userland/userland.template.html",

    scope: true,

    bindToController: true,
    controller: "UserlandController",
    controllerAs: "vm"
  }
}

UserlandDirective.$inject = [];

angular.module("abbc").directive("userland", UserlandDirective);
