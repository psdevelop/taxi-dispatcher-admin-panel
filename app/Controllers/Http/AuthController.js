'use strict'

const Env = use('Env')
const User = use('App/Models/User')
const clients = require('./clients.js')

class AuthController {
  async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        //user.id = null
        user.username = username
        user.email = email
        user.password = password

        user = await user.save()
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
  }

  async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)

            //Env.set('TOKEN', accessToken.token)
            clients.add(user.username, accessToken)
            return response.json({"user":user, "access_token": accessToken})
          }

        }
        catch (e) {
          return response.json({message: 'You first need to register!' + e})
        }
  }

  async logout({request, auth, response}) {
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU2Mjg3OTk3Mn0.Ih1EtNqqlS6pknSIYHJyqHyJ0dJNc9jvNo-hOprcdF4'//request.input('refreshToken');
        if(!refreshToken){

            // You can throw any exception you want here
            throw BadRequestException.invoke(`Refresh Token missing`);
        }

      //  await auth
      //    .authenticator('jwt')
      //    .revokeTokens([refreshToken], true)

      await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken, true)

      return response.send({status : 200, "message" : 'success'})
  }
}

module.exports = AuthController
