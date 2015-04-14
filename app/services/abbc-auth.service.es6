/**
 * Created by topher on 4/14/15.
 */

function AbbcAuth($firebaseAuth, store) {
  var listeners = [];
  var service = this;

  service.firebaseAuth = $firebaseAuth(store.baseRef);
  service.user = null;

  // Allow other services/components to register themselves
  // to receive updates.
  service.registerListener = function(listener) {
    listeners.push(listener);
  };

  // When a firebase auth happens, attempt to parse the data
  // and then notify listeners
  service.firebaseAuth.$onAuth(function(authData) {
    console.log(" *** authData: ", authData);

    if (authData) {
      if (authData.provider === "twitter") {
        service.user = {
          displayName: authData.twitter.displayName
        }
      }
    } else {
      service.user = null;
    }

    // Notify the listeners
    for (let listener of listeners) {
      if (listener.onAuth) {
        listener.onAuth(service.user);
      }
    }
  });

  // Allow user to login
  service.login = function(provider) {
    return service.firebaseAuth.$authWithOAuthPopup(provider)
      .catch(function(error) {
        alert("A login error occurred: " + error);
      });
  };

  // Allow users to logout
  service.logout = function() {
    return service.firebaseAuth.$unauth();
  };
}

AbbcAuth.$inject = ["$firebaseAuth", "AbbcStore"];

angular.module("abbc").service("AbbcAuth", AbbcAuth);
