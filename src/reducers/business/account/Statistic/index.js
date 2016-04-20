import Immutable from 'immutable'
import {ACCOUNT_STATISTIC_UPDATEISPENE,ACCOUNT_STATISTIC_SEARCH} from 'actions/Business/Account/Statistic'


const $$initialState = Immutable.fromJS({
	IsPene:false,
	value:''
})

const  statistic = ($$state = $$initialState, action)=>{
    switch(action.type) {
    	case ACCOUNT_STATISTIC_UPDATEISPENE:
    		return $$state.merge({IsPene:true})
    	case ACCOUNT_STATISTIC_SEARCH:
    		return $$state.merge({value:action.payload})
        default:
            return $$state
    }
}

export default statistic