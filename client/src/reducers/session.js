import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from '../actions/session'

const _nullSession = {
    userId: null,
    username: null
}

const sessionReducer = (state=_nullSession, { type, user }) => {
    Object.freeze(state)
    switch (type) {
        case RECEIVE_CURRENT_USER: return user
        case LOGOUT_CURRENT_USER: return _nullSession
        default: return state
    }
}

export default sessionReducer