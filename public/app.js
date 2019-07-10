$('a#login-button').click(function(e) {
  e.preventDefault();
});

$('a#logout-button').click(function(e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: '/auth/logout',
    data: {
      refreshToken: true
    },
    success: function (data) {
      window.location = '/'
    }
  });

});
