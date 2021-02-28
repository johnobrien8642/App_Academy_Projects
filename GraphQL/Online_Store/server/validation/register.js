const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  data.name = validText(data.name) ? data.name : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.name)) {
    return { message: 'Name is required', isValid: false }
  }

  if (!Validator.isEmail(data.email)) {
    return { message: 'Email is invalid', isValid: false }
  }

  if (Validator.isEmpty(data.email)) {
    return { message: 'Email is required', isValid: false }
  }

  if (Validator.isEmpty(data.password)) {
    return { message: 'Password is required', isValid: false }
  }
  
  if (!Validator.isLength(data.password, { min: 7, max: 33})) {
    return { message: 'Password length must be longer than 8 and shorter than 32'}
  }

  return {
    message: '',
    isValid: true
  }
}