'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sector extends Model {
  static get table () {
    return 'Sektor_raboty'
  }
}

module.exports = Sector
