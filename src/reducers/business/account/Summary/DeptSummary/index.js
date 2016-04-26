import Immutable from 'immutable'
import {
	ACCOUNT_DEPTSUMMARY_SEARCH,
	ACCOUNT_DEPTSUMMARY_CHANGEPENE,
    ACCOUNT_DEPTSUMMARY_INPUTVAL
} from 'actions/Business/Account/Summary/DeptSummary'


const $$initialState = Immutable.fromJS({
	value:'',
	pene:false
})

const  DeptSummary = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case ACCOUNT_DEPTSUMMARY_INPUTVAL:
            return $$state.merge({value:action.payload})
    	case ACCOUNT_DEPTSUMMARY_SEARCH:
    		return $$state
    	case ACCOUNT_DEPTSUMMARY_CHANGEPENE:
    		return $$state.merge({pene:true})
        default:
            return $$state
    }
}

export default DeptSummary