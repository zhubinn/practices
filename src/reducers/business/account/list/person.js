/**
 * Created by janeluck on 4/25/16.
 */

import Immutable from 'immutable'
import {    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE
} from 'actions/business/account/list/person'
const $$initialState = Immutable.fromJS({
    rows: [],
    current: 1,
    total: 20,
    pageSize: 20

})

export default function account_list_person($$state = $$initialState, action) {
    switch(action.type) {

        case GET_TABLE_DATA:
            return $$state.merge({
                rows: [],
                current: 1,
                total: 20,
                pageSize: 20
            })
        case GET_TABLE_DATA_SUCCESS:
            return $$state.merge({
                rows: action.payload.rows,
                current: action.payload.current,
                total: action.payload.total,
                pageSize: action.payload.pageSize
            })
        case GET_TABLE_DATA_FAILURE:
            return $$state.merge({
                rows: [],
                current: 1,
                total: 20,
                pageSize: 20
            })

        default:
            return $$state.merge({
                rows: [],
                current: 1,
                total: 20,
                pageSize: 20
            })
    }
}