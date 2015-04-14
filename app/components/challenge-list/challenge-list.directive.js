/**
 * Created by topher on 4/14/15.
 */

(function() {
  function ChallengeListDirective() {
    return {
      restrict: "E",
      templateUrl: "components/challenge-list/challenge-list.template.html",

      bindToController: true,
      controller: "NutritionTrackerController",
      controllerAs: "vm"
    }
  }

  ChallengeListDirective.$inject = [];

  angular.module("abbc").directive("challengeList", ChallengeListDirective);
})();
