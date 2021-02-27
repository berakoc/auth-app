export const parseError = (error, options={
    onlyMessage: false
}) => {
    return error.isJoi ? (options.onlyMessage && error.details[0].message) || error.details[0] : JSON.stringify(error, options.onlyMessage ? ['message'] : Object.getOwnPropertyNames(error))
}

export const sessionizeUser = (user) => ({
    userId: user.id,
    username: user.username
})