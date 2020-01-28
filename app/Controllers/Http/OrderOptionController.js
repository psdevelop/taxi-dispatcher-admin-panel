'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const OrderOption = use('App/Models/OrderOption');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class OrderOptionController {
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
    let options = await Database
      .select('ORDER_OPTION.*', 'PRICE_POLICY.POLICY_NAME as POLICY_NAME')
      .from('ORDER_OPTION')
      .leftJoin('PRICE_POLICY', 'ORDER_OPTION.PR_POLICY_ID', 'PRICE_POLICY.ID')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('orderoption.index', {
            title: 'Опции заказа',
            optionsList: options
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
    let option = await Database
      .table('ORDER_OPTION')
      .where('ID', params.id)
      .first()

    let policyList =  await Database
        .select('PRICE_POLICY.*')
        .from('PRICE_POLICY')

    return view.render('orderoption.edit', {
            title: 'Изменение опции',
            option: option,
            policyList: policyList
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
    const OPTION_NAME = request.input('OPTION_NAME')
    const SHORT_NAME = request.input('SHORT_NAME')
    const PR_POLICY_ID = request.input('PR_POLICY_ID')
    const IF_DEF = request.input('IF_DEF')
    const OSUMM_COEFF = request.input('OSUMM_COEFF')
    const OS_COMPOSED = request.input('OS_COMPOSED')
    const start_time = request.input('start_time')
    const end_time = request.input('end_time')

    const affectedRows = await Database.table('ORDER_OPTION')
      .where('id', params.id)
      .update({
        'OPTION_NAME': OPTION_NAME,
        'SHORT_NAME': SHORT_NAME,
        'PR_POLICY_ID': PR_POLICY_ID,
        'IF_DEF': IF_DEF,
        'OSUMM_COEFF': OSUMM_COEFF,
        'OS_COMPOSED': OS_COMPOSED
        //'start_time': start_time,
        //'end_time': end_time
      });

    response.redirect('/orderoptions?token=' + request.input('token'))
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

module.exports = OrderOptionController
