'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PricePolicy = use('App/Models/PricePolicy');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class PricePolicyController {
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
    let policies = await Database
      .raw('select pp.* , sp1.Naimenovanie as companyName ' +
        ' from PRICE_POLICY pp ' +
        ' left Join Spravochnik sp1 on pp.company_id = sp1.BOLD_ID ')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('pricepolicy.index', {
            title: 'Тарифные планы',
            policiesList: policies
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
    let policy = await Database
      .table('PRICE_POLICY')
      .where('ID', params.id)
      .first()

    let companiesList =  await Database
      .select('Gruppa_voditelei.BOLD_ID as BOLD_ID', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Gruppa_voditelei')
      .innerJoin('Spravochnik', 'Gruppa_voditelei.BOLD_ID', 'Spravochnik.BOLD_ID')

    return view.render('pricepolicy.edit', {
            title: 'Изменение тарифного плана',
            policy: policy,
            companiesList: companiesList
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
    const POLICY_NAME = request.input('POLICY_NAME')
    const company_id = request.input('company_id')
    const SHORT_NAME = request.input('SHORT_NAME')
    const IF_DEF = request.input('IF_DEF')

    const affectedRows = await Database.table('PRICE_POLICY')
      .where('ID', params.id)
      .update({
        'POLICY_NAME': POLICY_NAME,
        'company_id': company_id,
        'SHORT_NAME': SHORT_NAME,
        'IF_DEF': IF_DEF
      });

    response.redirect('/pricepolicies?token=' + request.input('token'))
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

module.exports = PricePolicyController
