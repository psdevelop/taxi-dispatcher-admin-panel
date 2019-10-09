'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PhonesDictionary extends Model {
  static get table () {
    return 'Sootvetstvie_parametrov_zakaza'
  }
}

module.exports = PhonesDictionary
