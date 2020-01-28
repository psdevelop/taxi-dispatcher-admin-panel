'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PricePolicy extends Model {
  static get table () {
    return 'PRICE_POLICY'
  }
}

module.exports = PricePolicy
