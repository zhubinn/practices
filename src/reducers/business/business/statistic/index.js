import Immutable from 'immutable'
import { ON_CHANGE, SEACH_DATA, GET_DATA_SUCCESS} from 'actions/business/business/statistic'
let statistic = {
	seachVal: '',
	statisticReport:{},
	statisticDetails:{},
}
export default function statistic($$state = Immutable.fromJS(statistic), action) {
    switch(action.type) {
    	case ON_CHANGE:
            debugger
    	    alert(action.val)
    	    return $$state.merge({ seachVal: action.val });
    	case SEACH_DATA:
    	    return $$state;
    	case GET_DATA_SUCCESS:
    	    return $$state.merge({ statisticReport: action.payload });
        default:
            return $$state;
    }
}