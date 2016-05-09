import Immutable from 'immutable'
import {
    account_Persummary_SEARCH,
    account_Persummary_INPUTVAL,
    account_Persummary_GETDATA,
    account_Persummary_GETDATA_SUCCESS,

} from 'actions/Business/Account/Summary/PerSummary'


const $$initialState = Immutable.fromJS({
    value:'',
    loading:true,
    rowData:[]
})

const  perSummary = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case account_Persummary_GETDATA:
            return $$state
        case account_Persummary_GETDATA_SUCCESS:
            return $$state.merge({rowData:action.payload,loading:false})
        case account_Persummary_INPUTVAL:
            return $$state.merge({value:action.payload})
        case account_Persummary_SEARCH:
            return $$state
        default:
            return $$state
    }
}

export default perSummary