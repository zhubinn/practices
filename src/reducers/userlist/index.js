/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'

export default function userlist(state = Immutable.fromJS({}), action) {
    switch(action.type) {
    	
        case 'CK_USERLIST_UPDATE':
            return state.merge(action.payload, {pending: "sss"})
        default:
            return state
    }
}