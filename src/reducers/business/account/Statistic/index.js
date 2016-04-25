import Immutable from 'immutable'
import {
	ACCOUNT_STATISTIC_SEARCH,
	ACCOUNT_STATISTIC_INPUTVAL,
    ACCOUNT_STATISTIC_GETDATA,
    ACCOUNT_STATISTIC_GETDATA_SUCCESS,

} from 'actions/Business/Account/Statistic'


const $$initialState = Immutable.fromJS({
	value:''
})

const  statistic = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case ACCOUNT_STATISTIC_GETDATA:
            return $$state
        case ACCOUNT_STATISTIC_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload})
    	case ACCOUNT_STATISTIC_INPUTVAL:
    		return $$state.merge({value:action.payload})
    	case ACCOUNT_STATISTIC_SEARCH:
    		return $$state
        default:
            return $$state
    }
}

export default statistic