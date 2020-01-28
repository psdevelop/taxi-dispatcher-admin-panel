'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Abonent = use('App/Models/Abonent');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class AbonentController {
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
    let abonents = await Database
      .select('Persona.*', 'ORDER_OPTION.OPTION_NAME as OPTION_NAME')
      .from('Persona')
      .leftJoin('ORDER_OPTION', 'Persona.option_id', 'ORDER_OPTION.ID')
      .where('Persona.BOLD_TYPE', 5)
      .where('Persona.Elektronnyi_adres', 'Индивидуальный клиент')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('abonent.index', {
            title: 'Абоненты',
            abonentsList: abonents
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
      .raw('EXEC [dbo].[InsertNewAbonentRetID] @bold_id = -1')

    response.redirect('/abonents?token=' + request.input('token'))
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
    let abonent = await Database
      .table('Persona')
      .where('BOLD_ID', params.id)
      .first()

    let optionsList =  await Database
      .select('ID', 'OPTION_NAME')
      .from('ORDER_OPTION')

    return view.render('abonent.edit', {
            title: 'Изменение абонента',
            abonent: abonent,
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
    const Korpus = request.input('Korpus')
    const option_id = request.input('option_id')
    const Familiya = request.input('Familiya')
    const Imya = request.input('Imya')
    const Otchestvo = request.input('Otchestvo')
    const Rabochii_telefon = request.input('Rabochii_telefon')
    const Ulica = request.input('Ulica')

    const affectedRows = await Database.table('Persona')
      .where('BOLD_ID', params.id)
      .update({
        'Korpus': Korpus,
        'option_id': option_id,
        'Familiya': Familiya,
        'Imya': Imya,
        'Otchestvo': Otchestvo,
        'Rabochii_telefon': Rabochii_telefon,
        'Ulica': Ulica
      });

    response.redirect('/abonents?token=' + request.input('token'))
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

module.exports = AbonentController
