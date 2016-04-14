/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import report from './__demo/report'
import user from './__demo/user'
import DemoPagination from './__demo/DemoPagination'

const rootReducer = combineReducers({
    report,
    user,
    routing,
    DemoPagination,
})
export default rootReducer