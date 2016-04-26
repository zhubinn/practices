/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    FUNCLOG_INPUT_CHANGE,
    FUNCLOGSIZE_CHANGE,
    GET_FUNCLOG_DATA,
    GET_FUNCLOG_SUCCESS,
    GET_FUNCLOG_FAILURE,
} from 'actions/business/Log/FunctionLog'

let funclog = {
    dataResult:{
        columns:[],
        data:[]
    },
    pageData:{
        page: 1,
        pageSize: 10
    }
}

export default function FuncLog($$state = Immutable.fromJS(funclog), action) {
     debugger
    switch(action.type) {
        case FUNCLOG_INPUT_CHANGE:
            return $$state.merge({ dataResult: action.payload });
        case FUNCLOGSIZE_CHANGE:
            return $$state.merge({ pageData: action.payload });
        case GET_FUNCLOG_DATA:
            return $$state;
        case GET_FUNCLOG_SUCCESS:
            return $$state.merge({ dataResult: action.payload });
        default:
            return $$state;
    }
}