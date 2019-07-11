'use strict'

const Env = use('Env')
const edge = require('edge.js')

class SiteController {
  async index({view, request, auth, response}) {
    let isLoggedIn = true
    try {
      await auth.check()
    } catch (error) {
      isLoggedIn = false
    }

    console.log(JSON.stringify(Env.get('TOKEN', '')));

    edge.global('token', function(){
      return Env.get('TOKEN', '');
    })

    return view.render('welcome', {
            isLoggedIn: isLoggedIn
        })
  }
}

module.exports = SiteController
