/**
 * Created by janeluck on 4/7/16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {GET_DATA, GET_DATA_SUCCESS,GET_DATA_FAILURE,getData} from 'actions/table'

export default function dataTable(state = Immutable.fromJS({ rows: [] }), action) {
    switch(action.type) {
        case GET_DATA:
            return state
        case GET_DATA_SUCCESS:
console.log(state.toJS())
            return state.merge({rows: action.data})
        case GET_DATA_FAILURE:
            return state
        default:
            return state
    }
}