import { FETCH_DATA, FETCH_DEPT_DATA, CLICK_DISPATCH_BUTTON, SELECT_CHANGE, SELECTED_DEPT_CHANGE, CLICK_TAB_HEADER, FETCH_SEARCH_SUGGEST , CHANGE_SEARCH_SUGGEST } from '../../../constants/dispatchCluesTypes'
import Immutable from 'immutable'

import {    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    GET_TABLE_QUERY,
    GET_TABLE_QUERY_SUCCESS,
    GET_TABLE_QUERY_FAILURE,

    } from 'actions/dispatchClues/dispatchCluesActions'


const $$initialState = {
            dispatchState:0, // 0 未分派(默认) 1已分派
            showModal:false,
            rowData:[],
            selectData:[],
            deptData:[],
            suggestData:[],
            rows: [],
            current: 1,
            total: 20,
            pageSize: 20,
            queryColumns: {},
            loading: false
}


export default function dispatchCluesState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case FETCH_DATA:
            return $$state.merge({
                "loading":action.loading,
                "rowData":action.data
            });
        case CLICK_TAB_HEADER:
            return $$state.merge({
                "loading":action.loading,
                "dispatchState":action.state
            });
        case FETCH_DEPT_DATA:
            return $$state.merge({
                "loading":action.loading,
                "deptData":action.data
            });
        case CLICK_DISPATCH_BUTTON:
            //可以直接使用返回過來的data
            //return $$state.merge(action.data);
            return $$state.merge({
                "showModal":action.isShowModal
            });
        case SELECT_CHANGE:
            return $$state.merge({
                "selectData":action.selectedRows
            });
        case SELECTED_DEPT_CHANGE:
            return $$state.merge({
                "selectedRadioID":action.value
            });
        case FETCH_SEARCH_SUGGEST:

            return $$state.merge({
                "suggestData":action.data.length ? action.data : []
            });

        case GET_TABLE_DATA:
            return $$state.merge({
                rows: [],
                current: 1,
                total: 20,
                pageSize: 20,
                loading: action.payload.loading
            });
        case GET_TABLE_DATA_SUCCESS:
            return $$state.merge({
                rows: action.payload.rows,
                current: action.payload.current,
                total: action.payload.total,
                pageSize: action.payload.pageSize,
                loading: action.payload.loading
            });
        case GET_TABLE_DATA_FAILURE:
            return $$state;
        case GET_TABLE_QUERY:
            return $$state.merge({
                queryColumns: {}
            });
        case GET_TABLE_QUERY_SUCCESS:
            return $$state.merge({
                queryColumns: action.payload.queryColumns
            });
        case GET_TABLE_QUERY_FAILURE:
            return $$state;
        default:
            return $$state
    }
}
