/**
 * Created by topher on 4/14/15.
 */

function UserlandController($scope, auth) {
  var vm = this;

  // Register ourselves as a listener
  auth.registerListener(vm);

  vm.user = null;

  vm.onAuth = function(user) {
    console.log(" *** user onAuth: ", user);

    vm.user = user;
  };

  vm.login = function(provider) {
    console.log(" *** attempting login with: ", provider);
    auth.login(provider);
  };

  vm.logout = function() {
    auth.logout();
  };
}

UserlandController.$inject = ["$scope", "AbbcAuth"];

angular.module("abbc").controller("UserlandController", UserlandController);
