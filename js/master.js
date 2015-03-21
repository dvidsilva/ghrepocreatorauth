/*globals console*/
(function () {
  'use strict';
  var auth = function auth (cb) {
    var ref = new Firebase("https://ghrepocreator.firebaseio.com");
    ref.authWithOAuthPopup("github", function(error, authData) {
      console.log("token", authData.token);
      cb(error, authData);
    }, {
      remember: "sessionOnly",
      scope: "public_repo"
    });
    return true;
  };

  $('document').ready(function () {
    $('.getstarted').on('click', function () {
      console.log('clicked on auth button');
      auth(function (error, authData) {
        if (!error && authData && authData.token) {
          $('#token').val(authData.token).removeClass('hidden');
          $('.getstarted').addClass('hidden');
        } else {
          $('#token').addClass('hidden');
          $('.errormsg').removeClass('hidden');
        }
      });
    });
  });

})();
