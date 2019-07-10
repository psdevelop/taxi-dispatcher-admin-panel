'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.string('name')
      table.string('email')
      table.string('title')
      table.string('tel')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
