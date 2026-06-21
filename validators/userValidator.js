const { body } = require("express-validator");

const authRepository = require("../repositories/authRepository");

const ERROR_MESSAGES = {
  EMAIL_INVALID: "Must be a valid email",
  PASSWORD_LENGTH: "Password must be between 12 and 128 characters",
  PASSWORD_REQUIRED: "Password is required",
  USERNAME_REQUIRED: "Username is required",
  USERNAME_LENGTH: "Username must be between 1 and 20 characters",
  USERNAME_TAKEN: "Username is already taken",
  EMAIL_TAKEN: "Email address is already taken",
  EMAIL_REQUIRED: "Email is required",
  //   USERNAME_ALPHA: "Username must only contain letters",
};

const validateSignup = [
  body("email")
    .isEmail()
    .withMessage(ERROR_MESSAGES.EMAIL_INVALID)
    .custom(async (value) => {
      const emailExists = await authRepository.checkEmailExists(value);
      if (emailExists) {
        throw new Error(ERROR_MESSAGES.EMAIL_TAKEN);
      }
    }),
  body("password")
    .isLength({ min: 12, max: 128 })
    .withMessage(ERROR_MESSAGES.PASSWORD_LENGTH),
  body("username")
    .notEmpty()
    .withMessage(ERROR_MESSAGES.USERNAME_REQUIRED)
    .isLength({ min: 1, max: 20 })
    .withMessage(ERROR_MESSAGES.USERNAME_LENGTH)
    .custom(async (value) => {
      const nameExists = await authRepository.checkUsernameExists(value);
      if (nameExists) {
        throw new Error(ERROR_MESSAGES.USERNAME_TAKEN);
      }
    }),
];

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage(ERROR_MESSAGES.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(ERROR_MESSAGES.EMAIL_INVALID),
  body("password").notEmpty().withMessage(ERROR_MESSAGES.PASSWORD_REQUIRED),
];
module.exports = { validateSignup, validateLogin };
