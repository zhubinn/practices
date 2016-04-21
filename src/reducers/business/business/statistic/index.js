/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    ON_CHANGE, 
    GET_REPORT_DATA, 
    GET_REPORT_SUCCESS, 
    GET_DETAILS_DATA, 
    GET_DETAILS_SUCCESS
} from 'actions/business/business/statistic'

let statistic = {
	seachVal: '',
	statisticReport:{
        columns:[],
        data:[]
    },
	statisticDetails:{
        columns:[],
        data:[]
    }
}

export default function statistic($$state = Immutable.fromJS(statistic), action) {
    switch(action.type) {
    	case ON_CHANGE:
    	    return $$state.merge({ seachVal: action.val });
    	case GET_REPORT_DATA:
    	    return $$state;
    	case GET_REPORT_SUCCESS:
    	    return $$state.merge({ statisticReport: action.payload });
        case GET_DETAILS_DATA:
            return $$state;
        case GET_DETAILS_SUCCESS:
            debugger
            return $$state.mergeDeep({ statisticDetails: action.payload });
        default:
            return $$state;
    }
}