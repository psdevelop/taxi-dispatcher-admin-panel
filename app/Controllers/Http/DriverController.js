'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Driver = use('App/Models/Driver');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class DriverController {
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
    let drivers = await Driver.query().fetch()
    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('driver.index', {
            title: 'Водители',
            driversList: drivers.toJSON()
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
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const name = request.input('name')
    const email = request.input('email')
    const title = request.input('title')
    const tel = request.input('tel')

    const contact = new Contact()
    contact.name = name
    contact.email = email
    contact.title = title
    contact.tel = tel

    await contact.save()
    return response.json(contact)
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
    let driver = await Database
      .table('Voditelj')
      .where('BOLD_ID', params.id)
      .first()

    console.log(driver);

    return view.render('driver.edit', {
            title: 'Водители',
            driver: driver
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
    const name = request.input('name')
    const email = request.input('email')
    const title = request.input('title')
    const tel = request.input('tel')

    let contact = await Contact.find(params.id)

    contact.name = name
    contact.email = email
    contact.title = title
    contact.tel = tel
    await contact.save()
    return response.json(contact)
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
    await Contact.find(params.id).delete()
    return response.json({message: 'Contact deleted!'})
  }
}

module.exports = DriverController
