'use strict'

const Env = use('Env')
const User = use('App/Models/User')
const clients = require('../../../clients')

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
            let accessToken = await auth.withRefreshToken().generate(user)

            //Env.set('TOKEN', accessToken.token)
            clients.set(user.username, {"user":user, "access_token": accessToken})
            return response.json({"user":user, "access_token": accessToken})
          }

        }
        catch (e) {
          return response.json({message: 'You first need to register!' + e})
        }
  }

  async logout({request, auth, response}) {
      const user = await auth.getUser(),
        clientsData = user && user.username && clients.get(user.username),
        accessTokens = clientsData && clientsData.access_token,
        token = accessTokens && accessTokens.token,
        refreshToken = accessTokens && accessTokens.refreshToken,
        clientsDataUser = clientsData && clientsData.user,
        email = clientsDataUser && clientsDataUser.email,
        password = clientsDataUser && clientsDataUser.password

      let accessToken = ""

      console.log(JSON.stringify(user))
      console.log(JSON.stringify(clientsData))
      console.log(refreshToken)

      if(!refreshToken || !email || !password){
        // You can throw any exception you want here
        throw Exception.invoke(`Refresh Token missing`);
      }

      const result = await auth.authenticator('jwt')
        .revokeTokens([token, refreshToken], true)

      clients.delete(user.username)

      /*try {
        if (await auth.attempt(email, password)) {
          let accessToken = await auth.withRefreshToken().generate(user)

          //Env.set('TOKEN', accessToken.token)
          //clients.set(user.username, {"user":user, "access_token": accessToken})
          //return response.json({"user":user, "access_token": accessToken})
          return response.status(200).json(result)
        }

      }
      catch (e) {
        return response.json({message: 'You first need to register!' + e})
      }*/

      return response.status(200).json(result)

      //await auth
      //  .authenticator('jwt')
      //  .revokeTokens([refreshToken], true)

      //await auth
      //  .newRefreshToken()
      //  .generateForRefreshToken(refreshToken, true)

      //let accessToken = await auth.generate(user)

      //clients.set(user.username, {"user":user, "access_token": accessToken})

      //return response.send({status : 200, "message" : 'success'})
  }
}

module.exports = AuthController
