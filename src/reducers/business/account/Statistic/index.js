import Immutable from 'immutable'
//import {} from 'actions/Business/Account/Customizable'


const $$initialState = Immutable.fromJS({
	IsPene:false
})

const  statistic = ($$state = $$initialState, action)=>{
    switch(action.type) {
        default:
            return $$state
    }
}

export default statistic