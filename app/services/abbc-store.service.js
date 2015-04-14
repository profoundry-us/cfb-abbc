/**
 * Created by topher on 4/14/15.
 */

(function() {
  function AbbcStore($firebaseObject, $firebaseArray) {
    this.baseRef = new Firebase("https://abbc-dev.firebaseio.com");

    this.child = function(childRef) {
      this.baseRef.child(childRef);
    };

    this.object = function(ref) {
      return $firebaseObject(ref);
    };

    this.array = function(ref) {
      return $firebaseArray(ref);
    }
  }

  AbbcStore.$inject = ["$firebaseObject", "$firebaseArray"];

  angular.module("abbc").service("AbbcStore", AbbcStore);
})();
