/**
 * Created by janeluck on 4/25/16.
 */

import Immutable from 'immutable'
import {    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    GET_TABLE_QUERY,
    GET_TABLE_QUERY_SUCCESS,
    GET_TABLE_QUERY_FAILURE,

} from 'actions/business/account/list/person'
const $$initialState = Immutable.fromJS({
    rows: [],
    current: 1,
    total: 20,
    pageSize: 20,
    queryColumns: {},
    loading: false


})

export default function account_list_person($$state = $$initialState, action) {
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
                loading: action.payload.loading
            })
        case GET_TABLE_DATA_FAILURE:
            return $$state
        case GET_TABLE_QUERY:
            return $$state.merge({
                queryColumns: {}
            })
        case GET_TABLE_QUERY_SUCCESS:
            return $$state.merge({
                queryColumns: action.payload.queryColumns
            })
        case GET_TABLE_QUERY_FAILURE:
            return $$state

        default:
            return $$state
    }
}