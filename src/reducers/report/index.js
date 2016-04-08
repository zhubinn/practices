/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { CK_REPORT_UPDATE } from 'actions/report/index'

export default function reportOther(state = Immutable.fromJS({}), action) {
    switch(action.type) {
        case CK_REPORT_UPDATE:
        
            return state.merge(action.payload, {pending: true})
        default:
            return state
    }
}