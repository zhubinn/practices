/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
let userlistObj = {
	pagination:{
		preDisabled :true, 
	}
}
export default function userlist(state = Immutable.fromJS(userlistObj), action) {
    switch(action.type) {
    	
        case 'CK_USERLIST_UPDATE':
            return state.merge(action.payload, {pending: "sss"})
        default:
            return state
    }
}