/**
 * Created by janeluck on 4/7/16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {GET_DATA, GET_DATA_SUCCESS,GET_DATA_FAILURE,getData, showDetail} from 'actions/table'


export default function dataTable(state = Immutable.fromJS({
    rows: [],
    separatedIndexes: Immutable.OrderedSet(),
    checkedRows: Immutable.OrderedSet()
}), action) {
    switch (action.type) {
        case GET_DATA:
            return state
        case GET_DATA_SUCCESS:
            return state.merge({rows: action.data})
        case GET_DATA_FAILURE:
            return state
        case 'SHOW_DETAIL':
            const { index } = action

            return state.updateIn(['separatedIndexes'], function (separatedIndexes) {
                if (separatedIndexes.has(index)) {
                    return separatedIndexes.delete(index)
                }
                return separatedIndexes.add(index)
            })
        case 'CHECK_ROW':

            const rowIndex = action.index

            return state.updateIn(['checkedRows'], function (checkedRows) {
                if (checkedRows.has(rowIndex)) {
                    return checkedRows.delete(rowIndex)
                }
                return checkedRows.add(rowIndex)
            })
        default:
            return state
    }
}