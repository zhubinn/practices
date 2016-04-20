import Immutable from 'immutable'
import { ON_CHANGE, SEACH_DATA, GET_CHANGE_SUCCESS} from 'actions/business/business/statistic'
let statistic = {
	seachVal: '',
	statisticReport:{
        columns:[],
        data:[]
    },
	statisticDetails:{},
}
export default function statistic($$state = Immutable.fromJS(statistic), action) {
    switch(action.type) {
    	case ON_CHANGE:
    	    alert(action.val)
    	    return $$state.merge({ seachVal: action.val });
    	case SEACH_DATA:
    	    return $$state;
    	case GET_CHANGE_SUCCESS:
            debugger
    	    return $$state.merge({ statisticReport: action.payload });
        default:
            return $$state;
    }
}