"use strict";

const mongoose = use("mongoose");
const { Schema } = use("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    firstName: {
      type: String,
    //   required: true,
      uppercase: true
    },
    lastName: {
      type: String,
    //   required: true,
      uppercase: true
    }
  },
  deletedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Indexes...
UserSchema.index({
  "name.firstName": "text",
  "name.lastName": "text"
});

module.exports = mongoose.model("User", UserSchema);