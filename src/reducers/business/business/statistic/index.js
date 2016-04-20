import Immutable from 'immutable'
import { GET_DATA } from 'actions/business/statistic'

export default function statistic($$state = Immutable.fromJS({}), action) {
	debugger
    switch(action.type) {
    	case GET_DATA:
    	    alert(action.val)
    	    return $$state;
        default:
            return $$state;
    }
}