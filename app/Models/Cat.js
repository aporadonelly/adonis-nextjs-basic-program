"use strict";

const mongoose = use('Providers/Mongoose');

const Cat = mongoose.model('Cat', {
    name: {
        type: String,
        unique: true
    }
})

module.exports = Cat;