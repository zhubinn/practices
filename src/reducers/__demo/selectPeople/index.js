
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
    COMPONENT_CHANGE_ISMUTISELECT,
    COMPONENT_CHANGE_ISSHOWMODAL,
    COMPONENT_GETPEOPLEDATA,
    COMPONENT_GETPEOPLEDATA_SUCCESS,
    COMPONENT_GETNEXTPEOPLEDATA,
    COMPONENT_GETNEXTPEOPLEDATA_SUCCESS,

} from 'actions/__demo/selectPeople'

const $$initialState = Immutable.fromJS({
    IsMultiselect:0,
    selectPeopleModal:false,
    data:[],
})

const selectPeople = ($$state = $$initialState, action) => {

    switch(action.type) {
        case COMPONENT_CHANGE_ISMUTISELECT:
            return $$state.merge({ 
                IsMultiselect: action.payload,
                selectPeopleModal:true
            })
        case COMPONENT_CHANGE_ISSHOWMODAL:
            return $$state.merge({
                selectPeopleModal:false
            })
        case COMPONENT_GETPEOPLEDATA :
            return $$state
        case COMPONENT_GETPEOPLEDATA_SUCCESS:
            return $$state.merge({
                data:action.payload
            })  

        case COMPONENT_GETNEXTPEOPLEDATA :
            return $$state
        case COMPONENT_GETNEXTPEOPLEDATA_SUCCESS:

            const currentData = $$state.toJS().data
            const totalData = currentData.concat(action.payload)
                return $$state.merge({data:totalData})

        default:
            return $$state
    }
}

export default selectPeople