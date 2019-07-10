'use strict'

class SiteController {
  async index({view, request, auth, response}) {
    let isLoggedIn = true
    try {
      await auth.check()
    } catch (error) {
      isLoggedIn = false
    }

    return view.render('welcome', {
            isLoggedIn: isLoggedIn
        })
  }
}

module.exports = SiteController
