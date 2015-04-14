(function() {
  function ChallengeListController($scope, $firebaseArray) {
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

  ChallengeListController.$inject = ["$scope", "$firebaseArray"];

  angular.module("abbc").controller("ChallengeListController", ChallengeListController);
})();
