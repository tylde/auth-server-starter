const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (error, salt) {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, null, function (error, hash) {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (submittedPassword, callback) {
  const user = this;
  bcrypt.compare(submittedPassword, user.password, function (error, isMatch) {
    if (error) return callback(error);

    callback(null, isMatch);
  });
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;