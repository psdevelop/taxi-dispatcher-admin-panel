'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderOption extends Model {
  static get table () {
    return 'ORDER_OPTION'
  }
}

module.exports = OrderOption
