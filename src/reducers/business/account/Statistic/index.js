import Immutable from 'immutable'
import {CK_UPDATEISPENE} from 'actions/Business/Account/Statistic'


const $$initialState = Immutable.fromJS({
	IsPene:false
})

const  statistic = ($$state = $$initialState, action)=>{
    switch(action.type) {
    	case CK_UPDATEISPENE:
    		return $$state.merge({IsPene:true})
        default:
            return $$state
    }
}

export default statistic