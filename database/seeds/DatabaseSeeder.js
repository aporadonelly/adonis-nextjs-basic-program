'use strict';

const UserSeeder = require('./UserSeeder')


class DatabaseSeeder {
  async run() {
    // Put yours seeders in the desired order
  
    await UserSeeder.run()
  }
}

module.exports = DatabaseSeeder