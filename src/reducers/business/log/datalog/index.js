/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    DATALOG_INPUT_CHANGE,
    DATALOGSIZE_CHANGE,
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_FAILURE,
} from 'actions/business/Log/DataLog'

let datalog = {
	dataResult:{
        columns:[],
        data:[]
    },
    pageData:{
        page: 1,
        pageSize: 10
    }
}

export default function Datalog($$state = Immutable.fromJS(datalog), action) {
    switch(action.type) {
        case DATALOG_INPUT_CHANGE:
            return $$state.merge({ dataResult: action.payload });
        case DATALOGSIZE_CHANGE:
            return $$state.merge({ pageData: action.payload });
    	case GET_DATALOG_DATA:
    	    return $$state;
    	case GET_DATALOG_SUCCESS:
    	    return $$state.merge({ dataResult: action.payload });
        default:
            return $$state;
    }
}