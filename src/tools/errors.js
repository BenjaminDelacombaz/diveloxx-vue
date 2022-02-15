const errorCodes = {
    'auth/invalid-email': 'The email or the password is incorrect',
    'auth/wrong-password': 'The email or the password is incorrect',
    'auth/email-already-in-use': "An account already exists with this email",
}

const getMessageFromCode = (code) => errorCodes[code] ?? code

export { getMessageFromCode }