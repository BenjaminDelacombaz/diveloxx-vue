import { helpers } from "@vuelidate/validators"

const regexTester = (regex, value) => (new RegExp(regex)).test(value)

const containsLowercaseLetterValidator = (value) => !helpers.req(value) || regexTester('(?=.*[a-z])', value)
const containsLowercaseLetter = helpers.withMessage('This field should contains at least one lowercase letter', containsLowercaseLetterValidator)

const containsUppercaseLetterValidator = (value) => !helpers.req(value) || regexTester('(?=.*[A-Z])', value)
const containsUppercaseLetter = helpers.withMessage('This field should contains at least one uppercase letter', containsUppercaseLetterValidator)

const containsDigitValidator = (value) => !helpers.req(value) || regexTester('(?=.*[0-9])', value)
const containsDigit = helpers.withMessage('This field should contains at least one digit', containsDigitValidator)

const containsSpecialCharValidator = (value) => !helpers.req(value) || regexTester('([^A-Za-z0-9])', value)
const containsSpecialChar = helpers.withMessage('This field should contains at least one special character', containsSpecialCharValidator)

export { containsLowercaseLetter, containsUppercaseLetter, containsDigit, containsSpecialChar }