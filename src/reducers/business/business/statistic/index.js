/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    CK_INPUT_CHANGE,
    GET_REPORT_DATA, 
    GET_REPORT_SUCCESS,
} from 'actions/business/business/statistic'

let statistic = {
	statisticReport:{
        columns:[],
        data:[]
    }
}

export default function statistic($$state = Immutable.fromJS(statistic), action) {
    switch(action.type) {
        case CK_INPUT_CHANGE:
            return $$state.merge({ statisticReport: action.payload });
    	case GET_REPORT_DATA:
    	    return $$state;
    	case GET_REPORT_SUCCESS:
    	    return $$state.merge({ statisticReport: action.payload });
        default:
            return $$state;
    }
}