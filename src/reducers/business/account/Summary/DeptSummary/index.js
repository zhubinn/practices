import Immutable from 'immutable'
import {
    account_DeptSummary_SEARCH,
    account_DeptSummary_INPUTVAL,
    account_DeptSummary_GETDATA,
    account_DeptSummary_GETDATA_SUCCESS,

} from 'actions/Business/Account/Summary/DeptSummary'


const $$initialState = Immutable.fromJS({
    value:'',
    loading:true,
    rowData:[]
})

const  deptSummary = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case account_DeptSummary_GETDATA:
            return $$state.merge({loading:true})
        case account_DeptSummary_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload,loading:false})
        case account_DeptSummary_INPUTVAL:
            return $$state.merge({value:action.payload})
        case account_DeptSummary_SEARCH:
            return $$state
        default:
            return $$state
    }
}

export default deptSummary