import Immutable from 'immutable'
import {ACCOUNT_SUMMARY_SEARCH} from 'actions/Business/Account/Summary'


const $$initialState = Immutable.fromJS({
	value:''
})

const  Summary = ($$state = $$initialState, action)=>{
    switch(action.type) {
    	case ACCOUNT_SUMMARY_SEARCH:
    		return $$state.merge({value:action.payload})
        default:
            return $$state
    }
}

export default Summary