'use strict'

let clients = {};

module.exports = {
  set: (login, data) => clients[login] = data,
  get: (login) => { return clients[login] || null },
  all: () => { return clients },
  delete: (login) => clients[login] = null
}
