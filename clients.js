'use strict'

let clients = {};

module.exports = {
  add: (login, data) => clients[login] = data,
  get: (login) => clients.login || null
}
