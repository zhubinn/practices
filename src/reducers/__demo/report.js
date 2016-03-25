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

const report = (state = Immutable.Map({ columns: [], rows: [] }), action) => {
    let payload = action.payload
    let rows = state.get('rows')

    switch(action.type) {
        case CK_REPORT_GETDATA:
            return state.merge({ pending: true })
        case CK_REPORT_GETDATA_SUCCESS:
            return state.merge(action.payload)
        case CK_REPORT_GETDATA_FAILURE:
            return state.merge(action.payload, { pending: false })
        case CK_REPORT_UPDATE:
            rows = rows.map((r, i) => {
                if (i === payload.index) {
                    return payload.row
                }
                return r
            })
            return state.set('rows', rows)
        case CK_REPORT_DELETE:
            rows = rows.filter((r, i) => {
                return i !== payload.index
            })
            return state.set('rows', rows)
        default:
            return state
    }
}

export default report