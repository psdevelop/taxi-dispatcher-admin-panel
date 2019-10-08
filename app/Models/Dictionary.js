'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dictionary extends Model {
  static get table () {
    return 'Spravochnik'
  }
}

module.exports = Dictionary
