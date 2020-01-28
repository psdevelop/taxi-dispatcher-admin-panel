'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const District = use('App/Models/District');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class DistrictController {
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
    let districts = await Database
      .raw('select ds.* , sp1.Naimenovanie as companyName, ' +
        ' sp2.Naimenovanie as defaultSectorName from DISTRICTS ds ' +
        ' left Join Spravochnik sp1 on ds.company_id = sp1.BOLD_ID ' +
        ' left Join Spravochnik sp2 on ds.default_sector_id = sp2.BOLD_ID')

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('district.index', {
            title: 'Районы',
            districtsList: districts
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
    let district = await Database
      .table('DISTRICTS')
      .where('id', params.id)
      .first()

    let companiesList =  await Database
      .select('Gruppa_voditelei.BOLD_ID as BOLD_ID', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Gruppa_voditelei')
      .innerJoin('Spravochnik', 'Gruppa_voditelei.BOLD_ID', 'Spravochnik.BOLD_ID')

    let sectorsList =  await Database
      .select('Sektor_raboty.BOLD_ID as BOLD_ID', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Sektor_raboty')
      .innerJoin('Spravochnik', 'Sektor_raboty.BOLD_ID', 'Spravochnik.BOLD_ID')

    return view.render('district.edit', {
            title: 'Изменение района',
            district: district,
            companiesList: companiesList,
            sectorsList: sectorsList
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
    const default_sector_id = request.input('default_sector_id')
    const address = request.input('address')
    const company_id = request.input('company_id')

    const affectedRows = await Database.table('DISTRICTS')
      .where('id', params.id)
      .update({
        'name': name,
        'default_sector_id': default_sector_id,
        'address': address,
        'company_id': company_id
      });

    response.redirect('/districts?token=' + request.input('token'))
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

module.exports = DistrictController
