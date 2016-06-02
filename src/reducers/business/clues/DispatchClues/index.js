/*import {
    FETCH_DATA,
    FETCH_DEPT_DATA,
    CLICK_DISPATCH_BUTTON,
    SELECT_CHANGE,
    SELECTED_DEPT_CHANGE,
    CLICK_TAB_HEADER,
    FETCH_SEARCH_SUGGEST ,
    CHANGE_SEARCH_SUGGEST,
    UPDATE_TABLE_DATA
} from '../../../constants/clues/dispatchCluesTypes'*/


import {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    FETCH_DEPT_DATA,
    SELECT_CHANGE,
    UPDATE_TABLE_DATA,
    SELECTED_DEPT_CHANGE,

    } from 'actions/business/clues/DispatchClues'


import Immutable from 'immutable'

const $$initialState = {
            rows: [],
            current: 1,
            total: 20,
            pageSize: 0,
            queryColumns: {},
            loading: false,
            assigned: 0,
            dispatchState:0, // 0 未分派(默认) 1已分派
            showModal:false,
            selectData:[],
            deptData:[],
}


export default function dispatchCluesState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case GET_TABLE_DATA:
            return $$state.merge({
                loading: action.payload.loading
            })
        case GET_TABLE_DATA_SUCCESS:
            return $$state.merge({
                rows: action.payload.rows,
                current: action.payload.current,
                total: action.payload.total,
                pageSize: action.payload.pageSize,
                loading: action.payload.loading,
                columns:action.payload.columns,
            })
        case GET_TABLE_DATA_FAILURE:
            return $$state.merge({
                loading: action.payload.loading
            })

        case FETCH_DEPT_DATA:
            return $$state.merge({
                "loading":false,
                "deptData":action.data
            });

        case SELECT_CHANGE:
            return $$state.merge({
                "selectData":action.selectedRows
            });
        case SELECTED_DEPT_CHANGE:
            return $$state.merge({
                "selectedRadioID":action.value
            });
        case UPDATE_TABLE_DATA:
            const rowData = $$state.toJS().rows
            const newData = rowData.filter(rowItem => {
                return action.selectIDs.indexOf(rowItem.ID) === -1
            })

            return $$state.merge({
                rows:newData,
                loading:false
            });


        default:
            return $$state
    }
}
