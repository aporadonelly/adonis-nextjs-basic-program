"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

const mongoose = require("mongoose");

class MongooseProvider extends ServiceProvider {
  register() {
    this.app.singleton("Providers/Mongoose", () => {
      mongoose.connect("mongodb://localhost:27017/test", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });

	      return mongoose;
    });

		// .. Optionally create an alias here or at /start/kernel.js
  }

  boot() {
    // Connect and cache mongoose provider
    this.app.use("Providers/Mongoose");
  }
}

module.exports = MongooseProvider;