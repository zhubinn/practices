import Immutable from 'immutable'
import {
	account_DeptStatistic_SEARCH,
	account_DeptStatistic_INPUTVAL,
    account_DeptStatistic_GETDATA,
    account_DeptStatistic_GETDATA_SUCCESS,

} from 'actions/Business/Account/Statistic/DeptStatistic'


const $$initialState = Immutable.fromJS({
	value:'',
    loading:true,
    rowData:[]
})

const  deptStatistic = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case account_DeptStatistic_GETDATA:
            return $$state.merge({loading:true})
        case account_DeptStatistic_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload,loading:false})
    	case account_DeptStatistic_INPUTVAL:
    		return $$state.merge({value:action.payload})
    	case account_DeptStatistic_SEARCH:
    		return $$state
        default:
            return $$state
    }
}

export default deptStatistic