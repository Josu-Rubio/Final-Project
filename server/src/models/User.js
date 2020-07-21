'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// Create Schema
const UserSchema = new Schema({
  name: { type: String, required: true, unique: true, maxLength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  jwt: { type: String },
  token: { type: String },
  active: { type: Boolean, default: false },
  expire: { type: Date, default: Date.now() + 3600000, select: false },
});

UserSchema.statics.insert = async function (user) {
  try {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    user.token = crypto.randomBytes(10).toString('hex');
    user.active = false;
    return await user.save();
  } catch (error) {
    console.log('Error creating user: ', error);
    return false;
  }
};

UserSchema.statics.update = async function (id, newUser) {
  try {
    let oldUser = await User.findById(id);
    if (oldUser) {
      oldUser.name = newUser.name || oldUser.name;
      oldUser.email = newUser.email || oldUser.email;
      return await oldUser.save();
    }
    return false;
  } catch (error) {
    console.log('Error updating user: ', error);
    return false;
  }
};

UserSchema.statics.activate = async function (id, token) {
  try {
    let user = await User.findById(id);
    if (user && user.token === token && user.expire >= Date.now()) {
      user.active = true;
      user.expire = null;
      user.token = null;
      return await user.save();
    }
    return false;
  } catch (error) {
    console.log('Error activating user: ', error);
    return false;
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
