/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { CK_USER_LOGIN, CK_USER_LOGIN_SUCCESS, CK_USER_LOGIN_FAILURE, CK_USER_REG } from 'actions/__demo/user'

export default function userLogin(state = Immutable.Map(), action) {
    switch(action.type) {
        case CK_USER_LOGIN:
            return state.merge(action.payload, { pending: true })
        case CK_USER_LOGIN_SUCCESS:
            return state.merge(action.payload, { pending: false })
        case CK_USER_LOGIN_FAILURE:
            return state.merge(action.payload, { pending: false })
        default:
            return state
    }
}