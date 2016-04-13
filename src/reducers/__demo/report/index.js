/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
    CK_REPORT_GETDATA,
    CK_REPORT_GETDATA_SUCCESS,
    CK_REPORT_GETDATA_FAILURE,
    CK_REPORT_GETDATA_ERROR_NETWORK,
    CK_REPORT_UPDATE,
    CK_REPORT_DELETE,
} from 'actions/__demo/report'

const $$initialState = Immutable.fromJS({
    columns: [],
    rows: []
})

const report = ($$state = $$initialState, action) => {
    let payload = action.payload

    switch(action.type) {
        case CK_REPORT_GETDATA:
            return $$state.merge({ pending: true })

        case CK_REPORT_GETDATA_SUCCESS:
            return $$state.merge(action.payload)

        case CK_REPORT_GETDATA_FAILURE:
            return $$state.merge(action.payload, { pending: false })

        case CK_REPORT_UPDATE:
            return $$state.updateIn(['rows'], function(rows) {
                return rows.map((map, index, list) => {
                    return index === payload.index ? payload.row : map
                })
            })

        case CK_REPORT_DELETE:
            return $$state.updateIn(['rows'], function(rows) {
                return rows.filter((map, index, list) => {
                    return index !== payload.index
                })
            })

        default:
            return $$state
    }
}

export default report