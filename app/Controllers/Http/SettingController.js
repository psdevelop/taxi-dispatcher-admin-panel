'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Setting = use('App/Models/Driver');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class SettingController {
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
    let drivers = await Database
      .select('Voditelj.*', 'Spravochnik.Naimenovanie as companyName')
      .from('Voditelj')
      .innerJoin('Spravochnik', 'Voditelj.otnositsya_k_gruppe', 'Spravochnik.BOLD_ID')
      .orderBy('Pozyvnoi', 'asc')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('driver.index', {
            title: 'Водители',
            driversList: drivers
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
      .raw('EXEC [dbo].[InsertNewDriverRetID] @bold_id = -1')

    response.redirect('/drivers?token=' + request.input('token'))
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
    let setting = await Database
      .table('Objekt_vyborki_otchyotnosti')
      .where('Tip_objekta', 'for_drivers')
      .first()

    let companiesList =  await Database
      .select('Gruppa_voditelei.BOLD_ID as BOLD_ID', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Gruppa_voditelei')
      .innerJoin('Spravochnik', 'Gruppa_voditelei.BOLD_ID', 'Spravochnik.BOLD_ID')

    return view.render('setting.edit', {
            title: 'Изменение водителя',
            setting: setting,
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
    const DAYLY_SALE = request.input('DAYLY_SALE')
    const MIN_DEBET = request.input('MIN_DEBET')

    const affectedRows = await Database.table('Objekt_vyborki_otchyotnosti')
      .where('BOLD_ID', request.input('id'))
      .update({
        'DAYLY_SALE': DAYLY_SALE,
        'MIN_DEBET': MIN_DEBET
      });

    response.redirect('/settings/0/?token=' + request.input('token'))
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

module.exports = SettingController
