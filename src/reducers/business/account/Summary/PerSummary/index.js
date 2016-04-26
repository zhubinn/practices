import Immutable from 'immutable'
import {
	ACCOUNT_PERSUMMARY_SEARCH,
	ACCOUNT_PERSUMMARY_CHANGEPENE,
    ACCOUNT_PERSUMMARY_INPUTVAL
} 
from 'actions/Business/Account/Summary/PerSummary'


const $$initialState = Immutable.fromJS({
	value:'',
	pene:false
})

const  PerSummary = ($$state = $$initialState, action)=>{
    switch(action.type) {
        case ACCOUNT_PERSUMMARY_INPUTVAL:
            return $$state.merge({value:action.payload})
    	case ACCOUNT_PERSUMMARY_SEARCH:
                    alert(action.payload)
    		return $$state
    	case ACCOUNT_PERSUMMARY_CHANGEPENE:
    		return $$state.merge({pene:true})
        default:
            return $$state
    }
}

export default PerSummary