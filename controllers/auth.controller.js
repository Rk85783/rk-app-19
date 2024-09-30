const bcrypt = require("bcrypt");
const Joi = require('joi');
const joiToForms = require('joi-errors-for-forms').form;

const User = require("../db/models/user.model");
const { VALIDATION_FAILED } = require("../utils/error.messages");

module.exports.register = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    const convertToForms = joiToForms();
    const validationError = convertToForms(error)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: VALIDATION_FAILED,
        data: validationError
      });
    }

    const hashPassword = bcrypt.hashSync(value.password, 10);
    const user = await User.create({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashPassword
    });
    if (user) {
      res.status(200).json({
        success: true,
        message: "Registration successfully done"
      })
    }
  } catch (error) {
    console.log("register(): catch error : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

module.exports.login = (req, res) => { }

