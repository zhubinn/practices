

import {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    CLICK_PREV_NEXT_BUTTON,

    } from 'actions/business/numberReport/ListView'


import Immutable from 'immutable'

const $$initialState = {
    rows: [],
    current: 1,
    total: 20,
    pageSize: 0,
    queryColumns: {},
    columns:[],
    loading: false,
}


export default function numberReportViewState($$state = Immutable.fromJS($$initialState), action) {

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
        case CLICK_PREV_NEXT_BUTTON:
            return $$state.merge({
                "dater":action.curInputValue
            });

        default:
            return $$state
    }
}
