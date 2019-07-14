$('a#login-button').click(function(e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: '/auth/login',
    data: {
      email: $('#login').val(),
      password: $('#password').val()
    },
    success: function (data) {
      let access_token = data && data.access_token,
        token = access_token && access_token.token;
      //access_token: {type: "bearer",
      //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsI…UzOH0.zv4ryGC3jDwKS1CrAAgDPmLA1tDNyzq9wUYKJylQpTE",
      //refreshToken: null}
      //user: {id: 2, username: "psdevelop",
      //email: "psdevelop@yandex.ru", password: "$2a$10$RBLL4iq0KZTMNKoleTefEeLCiQRV4de/WqD.khrxCvL7G4bG5k9Ny",
      //created_at: "2019-07-10 13:40:57", …}
      window.location = '/' + (token ? '?token=' + token : '');
    }
  });
});

$('a#logout-button').click(function(e) {
  e.preventDefault();

  const token = $(e.target).closest('div.logout-form')
    .find('input#auth-token').val();

  $.ajax({
    type: "POST",
    url: '/auth/logout',
    data: {
      refreshToken: true,
      token: token
    },
    success: function (data) {
      window.location = '/?token=' + token
    }
  });

});
