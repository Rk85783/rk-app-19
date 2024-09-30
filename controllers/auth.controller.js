const bcrypt = require("bcrypt");
const Joi = require('joi');

const User = require("../db/models/user.model");

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: {
          error: error.details
        }
      });
    }

    const hashPassword = bcrypt.hashSync('password', 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
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

