'use strict'

const Env = use('Env')
const edge = require('edge.js')
const clients = require('../../../clients')
const dateFormat = require('../../../dateFormat')

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
      let clientsData = user && user.username && clients.get(user.username)
      token = clientsData && clientsData.access_token && clientsData.access_token.token

      //console.log(JSON.stringify(clients.all()))
      isLoggedIn = token ? isLoggedIn : false;
      //console.log(JSON.stringify(user))
      //console.log('[' + token + ']');
    } catch (error) {
      console.log('Missing or invalid jwt token' + error)
    }

    edge.global('token', function(){
      //return Env.get('TOKEN', '');
      return token || 1;
    })

    edge.global('dateFormat', function(date, mask, utc){
      return dateFormat.dateFormat(date, mask, utc);
    })

    if (isLoggedIn && !request.input('main', '')) {
      response.redirect('/drivers?token=' + token)
    }

    return view.render('welcome', {
            isLoggedIn: isLoggedIn
        })
  }
}

module.exports = SiteController
