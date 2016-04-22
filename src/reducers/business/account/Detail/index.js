import Immutable from 'immutable'
import {ACCOUNT_DETAIL_SEARCH} from 'actions/Business/Account/Detail'


const $$initialState = Immutable.fromJS({
	value:''
})

const  detail = ($$state = $$initialState, action)=>{
    switch(action.type) {
    	case ACCOUNT_DETAIL_SEARCH:
    		return $$state.merge({value:action.payload})
        default:
            return $$state
    }
}

export default detail