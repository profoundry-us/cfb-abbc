function ChallengeListController($scope, store) {
  var ref = store.child("challenges"),
      vm = this;

  vm.challenges = store.array(ref);

  vm.addChallenge = function(newChallenge) {
    vm.challenges.$add(newChallenge);
    vm.newChallenge = {};
  };

  vm.removeChallenge = function(challenge) {
    vm.challenges.$remove(challenge);
  };
}

ChallengeListController.$inject = ["$scope", "AbbcStore"];

angular.module("abbc").controller("ChallengeListController", ChallengeListController);
