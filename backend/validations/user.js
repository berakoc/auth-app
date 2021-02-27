import Joi from 'joi';

const email = Joi.string().email().required()
const username = Joi.string().alphanum().min(3).max(30).required()

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,16}$/
export const passwordErrorMessage =
    'must be between 6-16 characters, ' +
    'have at least one capital letter, ' +
    'one lowercase letter, one digit, ' +
    'and one special character'

const password = Joi.string().regex(passwordRegex).options({
    messages: {
        'string.pattern.base': passwordErrorMessage
    }
}).required()

export const signUp = Joi.object().keys({
    email,
    username,
    password
})

export const signIn = Joi.object().keys({
    email,
    password
})