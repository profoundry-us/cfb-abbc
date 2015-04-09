(function() {
  function NutritionTrackerDirective() {
    return {
      restrict: "E",
      templateUrl: "components/nutrition-tracker/nutrition-tracker.template.html",

      bindToController: true,
      controller: "NutritionTrackerController",
      controllerAs: "vm"
    }
  }

  NutritionTrackerDirective.$inject = [];

  angular.module("abbc").directive("nutritionTracker", NutritionTrackerDirective);
})();
