'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class District extends Model {
  static get table () {
    return 'DISTRICTS'
  }
}

module.exports = District
