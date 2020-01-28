'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Setting extends Model {
  static get table () {
    return 'Objekt_vyborki_otchyotnosti'
  }
}

module.exports = Setting
