'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AreaLine extends Model {
  static get table () {
    return 'AREA_LINES'
  }
}

module.exports = AreaLine
