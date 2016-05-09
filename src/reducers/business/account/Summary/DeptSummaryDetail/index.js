import Immutable from 'immutable'
import {
	account_SummaryDetail_SEARCH,
	account_SummaryDetail_INPUTVAL,
    account_SummaryDetail_GETDATA,
    account_SummaryDetail_GETDATA_SUCCESS,

} from 'actions/Business/Account/Summary/DeptSummaryDetail'


const $$initialState = Immutable.fromJS({
	value:'',
    loading:true,
    rowData:[]
})

const  deptSummaryDetail = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case account_SummaryDetail_GETDATA:
            return $$state
        case account_SummaryDetail_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload,loading:false})
    	case account_SummaryDetail_INPUTVAL:
    		return $$state.merge({value:action.payload})
    	case account_SummaryDetail_SEARCH:
    		return $$state
        default:
            return $$state
    }
}

export default deptSummaryDetail