import Immutable from 'immutable'
import {
	account_Pertatistic_SEARCH,
	account_Pertatistic_INPUTVAL,
    account_Pertatistic_GETDATA,
    account_Pertatistic_GETDATA_SUCCESS,

} from 'actions/Business/Account/Statistic/PerStatistic'


const $$initialState = Immutable.fromJS({
	value:'',
    loading:true,
    rowData:[]
})

const  perStatistic = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case account_Pertatistic_GETDATA:
            return $$state
        case account_Pertatistic_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload,loading:false})
    	case account_Pertatistic_INPUTVAL:
    		return $$state.merge({value:action.payload})
    	case account_Pertatistic_SEARCH:
    		return $$state
        default:
            return $$state
    }
}

export default perStatistic