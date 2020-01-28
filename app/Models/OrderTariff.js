'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderTariff extends Model {
  static get table () {
    return 'ORDER_TARIF'
  }
}

module.exports = OrderTariff
