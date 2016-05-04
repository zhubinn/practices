import Immutable from 'immutable'
import {    
	ACCOUNT_DETAIL_INPUTVAL,
    ACCOUNT_DETAIL_GETDATA,
    ACCOUNT_DETAIL_GETDATA_SUCCESS
} from 'actions/Business/Account/Detail'


const $$initialState = Immutable.fromJS({
	value:'',
	rowData:[]
})

const  detail = ($$state = $$initialState, action)=>{
    switch(action.type) {
    	case ACCOUNT_DETAIL_GETDATA:
    		return $$state
    	case ACCOUNT_DETAIL_GETDATA_SUCCESS:
    		return $$state.merge({rowData:action.payload})
    	case ACCOUNT_DETAIL_INPUTVAL:
    		return $$state.merge({value:action.payload})
        default:
            return $$state
    }
}

export default detail