'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Company = use('App/Models/Company');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class CompanyController {
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
    let companies = await Database
      .select('Gruppa_voditelei.*', 'Spravochnik.Naimenovanie as companyName',
        'PRICE_POLICY.POLICY_NAME as POLICY_NAME')
      .from('Gruppa_voditelei')
      .innerJoin('Spravochnik', 'Gruppa_voditelei.BOLD_ID', 'Spravochnik.BOLD_ID')
      .leftJoin('PRICE_POLICY', 'Gruppa_voditelei.PR_POLICY_ID', 'PRICE_POLICY.id')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('company.index', {
            title: 'Компании',
            companiesList: companies
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
    await Database
      .raw('EXEC [dbo].[InsertNewDriverCompanyRetID] @bold_id = -1')

    response.redirect('/companies?token=' + request.input('token'))
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
    let company = await Database
      .select('Gruppa_voditelei.*', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Gruppa_voditelei')
      .innerJoin('Spravochnik', 'Gruppa_voditelei.BOLD_ID', 'Spravochnik.BOLD_ID')
      .where('Gruppa_voditelei.BOLD_ID', params.id)
      .first()

    let policyList =  await Database
      .select('PRICE_POLICY.*')
      .from('PRICE_POLICY')

    return view.render('company.edit', {
            title: 'Изменение компании',
            company: company,
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
    const Naimenovanie = request.input('Naimenovanie')
    const PR_POLICY_ID = request.input('PR_POLICY_ID')

    await Database.table('Spravochnik')
      .where('BOLD_ID', params.id)
      .update({
        'Naimenovanie': Naimenovanie
      });

    const affectedRows = await Database.table('Gruppa_voditelei')
      .where('BOLD_ID', params.id)
      .update({
        'PR_POLICY_ID': PR_POLICY_ID
      });

    response.redirect('/companies?token=' + request.input('token'))
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

module.exports = CompanyController
