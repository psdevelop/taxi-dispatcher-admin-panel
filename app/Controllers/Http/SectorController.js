'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Sector = use('App/Models/Sector');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class SectorController {
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
    let sectors = await Database
      .raw('select Sektor_raboty.*, sp1.Naimenovanie as name, ' +
        ' sp2.Naimenovanie as companyName, ds.name as districtName' +
        ' from Sektor_raboty ' +
        ' inner Join Spravochnik sp1 on Sektor_raboty.BOLD_ID = sp1.BOLD_ID ' +
        ' left Join Spravochnik sp2 on Sektor_raboty.company_id = sp2.BOLD_ID ' +
        ' left Join DISTRICTS ds on Sektor_raboty.district_id = ds.id ' +
        ' order By Sektor_raboty.Podskazka_na_sektore asc');

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('sector.index', {
            title: 'Сектора',
            sectorsList: sectors
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
      .raw('EXEC [dbo].[InsertNewSectorRetID] @bold_id = -1')

    response.redirect('/sectors?token=' + request.input('token'))
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
    let sector = await Database
      .select('Sektor_raboty.*', 'Spravochnik.Naimenovanie as sectorName')
      .from('Sektor_raboty')
      .innerJoin('Spravochnik', 'Sektor_raboty.BOLD_ID', 'Spravochnik.BOLD_ID')
      .where('Sektor_raboty.BOLD_ID', params.id)
      .first()

    let companiesList =  await Database
      .select('Gruppa_voditelei.BOLD_ID as BOLD_ID', 'Spravochnik.Naimenovanie as Naimenovanie')
      .from('Gruppa_voditelei')
      .innerJoin('Spravochnik', 'Gruppa_voditelei.BOLD_ID', 'Spravochnik.BOLD_ID')

    let districtsList =  await Database
      .select('DISTRICTS.*')
      .from('DISTRICTS')

    return view.render('sector.edit', {
            title: 'Изменение сектора',
            sector: sector,
            companiesList: companiesList,
            districtsList: districtsList
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
    const Naimenovanie = request.input('sectorName')
    const company_id = request.input('company_id')
    const Podskazka_na_sektore = request.input('Podskazka_na_sektore')
    const district_id = request.input('district_id')

    await Database.table('Spravochnik')
      .where('BOLD_ID', params.id)
      .update({
        'Naimenovanie': Naimenovanie
      });

    const affectedRows = await Database.table('Sektor_raboty')
      .where('BOLD_ID', params.id)
      .update({
        'company_id': company_id,
        'district_id': district_id,
        'Podskazka_na_sektore': Podskazka_na_sektore,
      });

    response.redirect('/sectors?token=' + request.input('token'))
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

module.exports = SectorController
