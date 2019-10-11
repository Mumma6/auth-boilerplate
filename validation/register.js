const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateReisterInput(data) {
  let errors = {};

  // Convert empty fields to empty string so we can use validator properly
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks. See if not empty and is email
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characyers";
  }

  if(!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Return our errors object with any and all errors         contained as well as an isValid boolean that checks      to see if we have any errors


  return {
    errors, 
    isValid: isEmpty(errors)
  
  }
};
