'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PhonesDictionary = use('App/Models/Company');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class PhonesDictionaryController {
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
    let phones = await Database
      .select('Sootvetstvie_parametrov_zakaza.*', 'Spravochnik.Naimenovanie as sectorName',
        'ORDER_OPTION.OPTION_NAME as OPTION_NAME')
      .from('Sootvetstvie_parametrov_zakaza')
      .leftJoin('Spravochnik', 'Sootvetstvie_parametrov_zakaza.otnositsya_k_sektoru', 'Spravochnik.BOLD_ID')
      .leftJoin('ORDER_OPTION', 'Sootvetstvie_parametrov_zakaza.option_id', 'ORDER_OPTION.ID')
      .orderBy('Sootvetstvie_parametrov_zakaza.Telefon_klienta', 'asc')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('phone.index', {
            title: 'Телефонный справочник',
            phonesList: phones
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
      .raw('EXEC [dbo].[InsertNewPhoneAddrRetID] @bold_id = -1')

    response.redirect('/phones?token=' + request.input('token'))
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
    let phone = await Database
      .table('Sootvetstvie_parametrov_zakaza')
      .where('BOLD_ID', params.id)
      .first()

    let sectorsList =  await Database
      .select('Sektor_raboty.BOLD_ID as BOLD_ID', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Sektor_raboty')
      .innerJoin('Spravochnik', 'Sektor_raboty.BOLD_ID', 'Spravochnik.BOLD_ID')

    //[ID],[OPTION_NAME]
    let optionsList =  await Database
      .select('ID', 'OPTION_NAME')
      .from('ORDER_OPTION')

    return view.render('phone.edit', {
            title: 'Изменение записи телефонного справочника',
            phone: phone,
            sectorsList: sectorsList,
            optionsList: optionsList
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
    const Telefon_klienta = request.input('Telefon_klienta')
    const Adres_vyzova_vvodim = request.input('Adres_vyzova_vvodim')
    const otnositsya_k_sektoru = request.input('otnositsya_k_sektoru')
    const option_id = request.input('option_id')

    const affectedRows = await Database.table('Sootvetstvie_parametrov_zakaza')
      .where('BOLD_ID', params.id)
      .update({
        'Telefon_klienta': Telefon_klienta,
        'Adres_vyzova_vvodim': Adres_vyzova_vvodim,
        'otnositsya_k_sektoru': otnositsya_k_sektoru,
        'option_id': option_id
      });

    response.redirect('/phones?token=' + request.input('token'))
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

module.exports = PhonesDictionaryController
