'use strict'

const Env = use('Env')
const edge = require('edge.js')
const clients = require('./clients.js')

class SiteController {
  async index({view, request, auth, response}) {
    let isLoggedIn = true, token
    try {
      await auth.check()
    } catch (error) {
      isLoggedIn = false
    }

    console.log(JSON.stringify(Env.get('TOKEN', '')));

    try {
      //{"id":2,"username":"psdevelop","email":"psdevelop@yandex.ru",
      //"password":"$2a$10$RBLL4iq0KZTMNKoleTefEeLCiQRV4de/WqD.khrxCvL7G4bG5k9Ny",
      //"created_at":"2019-07-10 13:40:57","updated_at":"2019-07-10 13:40:57"}
      let user = await auth.getUser()
      let userData = user && user.username && clients.get(user.username)
      token = userData && userData.token
      console.log(JSON.stringify(user));
    } catch (error) {
      console.log('Missing or invalid jwt token')
    }

    token && edge.global('token', function(){
      //return Env.get('TOKEN', '');
      return token;
    })

    return view.render('welcome', {
            isLoggedIn: isLoggedIn
        })
  }
}

module.exports = SiteController
