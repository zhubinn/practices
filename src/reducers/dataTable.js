/**
 * Created by janeluck on 4/7/16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {GET_DATA, GET_DATA_SUCCESS,GET_DATA_FAILURE,getData, showDetail} from 'actions/table'



export default function dataTable(state = Immutable.fromJS({ rows: [], separatedIndexes: [] }), action) {
    switch(action.type) {
        case GET_DATA:
            return state
        case GET_DATA_SUCCESS:
            return state.merge({rows: action.data})
        case GET_DATA_FAILURE:
            return state
        case 'SHOW_DETAIL':

            const indexes = state.get('separatedIndexes').toJS();
            let nIndexes
            if (indexes.indexOf(action.i) > -1) {
                 nIndexes = indexes.filter(function(item){
                    return item !== action.i;
                })

            } else {
                 indexes.push(action.i);
                nIndexes = indexes

            }


            const newState = state.merge({separatedIndexes: nIndexes})
            return newState

        default:
            return state
    }
}