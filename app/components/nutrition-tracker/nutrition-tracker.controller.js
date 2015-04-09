(function() {
  function NutritionTrackerController($scope, $firebaseArray) {
    var ref = new Firebase("https://abbc-dev.firebaseio.com" + "/challenges"),
        vm = this;

    vm.challenges = $firebaseArray(ref);

    vm.addChallenge = function(newChallenge) {
      vm.challenges.$add(newChallenge);
      vm.newChallenge = {};
    };

    vm.removeChallenge = function(challenge) {
      vm.challenges.$remove(challenge);
    };
  }

  NutritionTrackerController.$inject = ["$scope", "$firebaseArray"];

  angular.module("abbc").controller("NutritionTrackerController", NutritionTrackerController);
})();
