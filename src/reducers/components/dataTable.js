/**
 * Created by janeluck on 4/7/16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {GET_DATA, GET_DATA_SUCCESS,GET_DATA_FAILURE,getData, showDetail, updateRow} from 'actions/Component/DataTable'
import {secondRowsData, secondColumns} from 'components/Business/DataTable/fakeData'


export default function dataTable($$state = Immutable.fromJS({
    default: {
        rows: [],
        pending: true,
        separatedIndexes: Immutable.OrderedSet(),
        selectedRowDetailObj: {},
        checkedRows: Immutable.OrderedSet(),
        searchBarShow: false
    }


}), action) {
    switch (action.type) {
        case 'INIT_SOURCE':
            return $$state.merge({
                [action.source]: Immutable.fromJS({
                    rows: [],
                    pending: true,
                    separatedIndexes: Immutable.OrderedSet(),
                    selectedRowDetailObj: {},
                    checkedRows: Immutable.OrderedSet(),
                    searchBarShow: false
                })
            })
        case GET_DATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({
                    rows: [],
                    pending: true,
                    separatedIndexes: Immutable.OrderedSet(),
                    selectedRowDetailObj: {},
                    checkedRows: Immutable.OrderedSet(),
                    searchBarShow: false
                })
            })

        case GET_DATA_SUCCESS:
            const { payload  } = action

            return $$state.updateIn([action.source], function (source) {
                return source.merge({
                    rows: payload.rows,
                    pending: payload.pending
                })
            })


        case GET_DATA_FAILURE:
            return $$state

        case 'GET_DETAIL_DATA':

            return $$state.updateIn([action.source], function (source) {
                return source.merge({pending: true})
            })


        case 'GET_DETAIL_DATA_SUCCESS':
            const { index, rows} = action.payload

            return $$state.updateIn([action.source, 'selectedRowDetailObj'], function (selectedRowDetailObj) {

                if (selectedRowDetailObj.toJS().hasOwnProperty(index)) {
                    return selectedRowDetailObj.delete(index)
                }
                return selectedRowDetailObj.set(index, {rows: rows, columns: secondColumns})
            })
        case 'CHECK_ROW':


            const rowIndex = action.index


            return $$state.updateIn([action.source, 'checkedRows'], function (checkedRows) {



                //debugger;
                // -1 为点击'全选'
                let newState = checkedRows
                if (action.isChecked) {
                    if (rowIndex === -1) {

                        for (let i = 0; i < $$state.toJS()[action.source]['rows'].length; i++) {
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
            return $$state.updateIn([action.source, 'rows'], function (rows) {
                return rows.map((map, index, list) => {
                    return index === action.index ? action.rowData : map
                })
            })
        // todo: 从getData分离
        case 'UPDATE_ROWS':
            return $$state
        case 'TOGGLE_SEARCHBAR':
            return $$state.updateIn([action.source], function (source) {
                return source.merge({searchBarShow: action.isShow})
            })
        default:
            return $$state
    }
}