import Immutable from 'immutable'
import {
	account_StatisticDetail_SEARCH,
	account_StatisticDetail_INPUTVAL,
    account_StatisticDetail_GETDATA,
    account_StatisticDetail_GETDATA_SUCCESS,

} from 'actions/Business/Account/Statistic/DeptStatisticDetail'


const $$initialState = Immutable.fromJS({
	value:'',
    loading:true,
    rowData:[]
})

const  deptStatisticDetail = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case account_StatisticDetail_GETDATA:
            return $$state
        case account_StatisticDetail_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload,loading:false})
    	case account_StatisticDetail_INPUTVAL:
    		return $$state.merge({value:action.payload})
    	case account_StatisticDetail_SEARCH:
    		return $$state
        default:
            return $$state
    }
}

export default deptStatisticDetail