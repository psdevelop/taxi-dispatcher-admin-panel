'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const OrderTariff = use('App/Models/OrderTariff');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class OrderTariffController {
  constructor() {
    this.data = {}
  }

  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ view }) {
    let tariffs = await Database
      .raw('select ot.* , pp1.POLICY_NAME as POLICY_NAME, ' +
        ' pp2.POLICY_NAME as outherPolicyName, oot.TARIF_NAME as outherTarifName ' +
        ' from ORDER_TARIF ot ' +
        ' left Join PRICE_POLICY pp1 on ot.PR_POLICY_ID = pp1.ID ' +
        ' left Join PRICE_POLICY pp2 on ot.outher_tplid = pp2.ID ' +
        ' left Join ORDER_TARIF oot on ot.outher_tarid = oot.ID ')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('ordertariff.index', {
            title: 'Тарифы поездок',
            tariffsList: tariffs
        })
    //yield response.sendView('contactList', this.data)
  }

  /**
   * Render a form to be used for creating a new contact.
   * GET contacts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new driver.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const userId = await Database
      .table('DISTRICTS')
      .insert({name: 'НОВЫЙ РАЙОН'})

    console.log(userId);

    response.redirect('/districts?token=' + request.input('token'))
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing contact.
   * GET contacts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    //let driver = await Driver.find('BOLD_ID', params.id)
    let tariff = await Database
      .table('ORDER_TARIF')
      .where('ID', params.id)
      .first()

    let policyList =  await Database
      .select('PRICE_POLICY.*')
      .from('PRICE_POLICY')

    let tariffList =  await Database
      .select('ORDER_TARIF.*')
      .from('ORDER_TARIF')

    return view.render('ordertariff.edit', {
            title: 'Изменение тарифа',
            tariff: tariff,
            policyList: policyList,
            tariffList: tariffList
        })
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const TARIF_NAME = request.input('TARIF_NAME')
    const PR_POLICY_ID = request.input('PR_POLICY_ID')
    const outher_tplid = request.input('outher_tplid')
    const outher_tarid = request.input('outher_tarid')
    const SHORT_NAME = request.input('SHORT_NAME')
    const IF_DEF = request.input('IF_DEF')
    const TIME_TARIF = request.input('TIME_TARIF')
    const TMETER_TARIF = request.input('TMETER_TARIF')
    const miss_every_nkm = request.input('miss_every_nkm')

    const affectedRows = await Database.table('ORDER_TARIF')
      .where('ID', params.id)
      .update({
        'TARIF_NAME': TARIF_NAME,
        'PR_POLICY_ID': PR_POLICY_ID,
        'outher_tplid': outher_tplid,
        'outher_tarid': outher_tarid,
        'SHORT_NAME': SHORT_NAME,
        'IF_DEF': IF_DEF,
        'TIME_TARIF': TIME_TARIF,
        'TMETER_TARIF': TMETER_TARIF,
        'miss_every_nkm': miss_every_nkm
      });

    response.redirect('/ordertariffs?token=' + request.input('token'))
    //return response.json(affectedRows)
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    //
  }
}

module.exports = OrderTariffController
