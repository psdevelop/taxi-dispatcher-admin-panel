'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AreaLine = use('App/Models/AreaLine');
const Database = use('Database');

/**
 * Resourceful controller for interacting with contacts
 */
class AreaLineController {
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
  async index ({ request, response, view }) {
    const tarifId = request.input('tarif_id');
    const sectorId = request.input('sector_id');
    let whereRaw = '';

    if (tarifId > 0) {
      whereRaw = ' AREA_LINES.tarif_id = ' + tarifId + ' ';
    }

    if (sectorId > 0) {
      if (tarifId > 0) {
        whereRaw += ' AND ';
      }
      whereRaw += ' AREA_LINES.sector_id = ' + sectorId + ' ';
    }

    let points = await Database
      .select('AREA_LINES.*')
      .from('AREA_LINES')
      .whereRaw(whereRaw)

    //return response.json(contacts)
    //console.log(contacts.toJSON());
    //this.data.contacts = contacts.toJSON()

    return view.render('arealine.index', {
            title: 'Точки зоны',
            pointsList: points,
            sectorId: sectorId,
            tarifId: tarifId
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
    const sectorId = request.input('sector_id')
    const tarifId = request.input('tarif_id')

    await Database
    .table('AREA_LINES')
    .insert({
      sector_id: sectorId,
      tarif_id: tarifId
    })
      //.raw('INSERT INTO AREA_LINES sector_id, tarif_id VALUES ()')

    response.redirect('/arealines/?sector_id=' + sectorId +
      '&tarif_id=' + tarifId + '&token=' + request.input('token'))
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
    let point = await Database
      .select('*')
      .from('AREA_LINES')
      .where('id', params.id)
      .first()

    return view.render('arealine.edit', {
            title: 'Изменение точки',
            point: point,
            sectorId: request.input('sector_id'),
            tarifId: request.input('tarif_id')
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
    const order_num = request.input('order_num')
    const lat = request.input('lat')
    const lon = request.input('lon')

    await Database.table('AREA_LINES')
      .where('id', params.id)
      .update({
        'order_num': order_num,
        'lat': lat,
        'lon': lon
      });

    response.redirect('/arealines?sector_id=' + request.input('sector_id') +
      '&tarif_id=' + request.input('tarif_id') + '&token=' + request.input('token'))
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

module.exports = AreaLineController
