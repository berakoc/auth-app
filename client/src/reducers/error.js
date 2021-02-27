import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../actions/error"
import { RECEIVE_CURRENT_USER } from "../actions/session"

const errorReducer = (state='', { message, type }) => {
    Object.freeze(state)
    switch (type) {
        case RECEIVE_ERRORS: return message
        case RECEIVE_CURRENT_USER:
        case CLEAR_ERRORS: return ''
        default: return state
    }
}

export default errorReducer