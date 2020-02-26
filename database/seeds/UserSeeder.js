'use strict'
const Database = use('Database');
const Hash = use('Hash')
/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const encryptedPassword = await Hash.make('123456')

    await Database.table('users').insert([
      {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: encryptedPassword
      }
    ])
  }
}

module.exports = UserSeeder
