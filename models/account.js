var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: { type: String, unique: true },
  password: String,
  fullname: String,
  roles: [String]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);