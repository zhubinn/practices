/**
 * Created by janeluck on 4/7/16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {GET_DATA, GET_DATA_SUCCESS,GET_DATA_FAILURE,getData, showDetail, updateRow} from 'actions/table'
import {secondRowsData, secondColumns} from 'components/DataTable/fakeData'


export default function dataTable(state = Immutable.fromJS({
    rows: [],
    separatedIndexes: Immutable.OrderedSet(),
    selectedRowDetailObj: {},
    checkedRows: Immutable.OrderedSet(),
    searchBarShow: false
}), action) {
    switch (action.type) {
        case GET_DATA:
            return state
        case GET_DATA_SUCCESS:
            return state.merge({rows: action.data})
        case GET_DATA_FAILURE:
            return state
        case 'SHOW_DETAIL':
            const { index, rows, columns } = action.payload

            return state.updateIn(['selectedRowDetailObj'], function (selectedRowDetailObj) {

                if (selectedRowDetailObj.toJS().hasOwnProperty(index)) {
                    return selectedRowDetailObj.delete(index)
                }
                return selectedRowDetailObj.set(index, {rows: secondRowsData, columns: secondColumns})
            })
        case 'CHECK_ROW':


            const rowIndex = action.index


            return state.updateIn(['checkedRows'], function (checkedRows) {
                // -1 为点击'全选'
                let newState = checkedRows
                if (action.isChecked) {
                    if (rowIndex === -1) {
                        for (let i = 0; i < state.get('rows').toJS().length; i++) {
                            newState = newState.add(i)
                        }
                    } else {
                        newState = newState.add(rowIndex)
                    }
                } else {
                    if (rowIndex === -1) {
                        newState = newState.clear()
                    } else {
                        newState = newState.delete(rowIndex)
                    }
                }

                return newState
            })
        case 'UPDATE_ROW':
            return state.updateIn(['rows'], function (rows) {
                return rows.map((map, index, list) => {
                    return index === action.index ? action.rowData : map
                })
            })
        case 'TOGGLE_SEARCHBAR':
            return state.merge({searchBarShow: action.isShow})
        default:
            return state
    }
}