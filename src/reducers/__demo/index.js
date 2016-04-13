/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'

import report from './report'
import user from './user'

const __demoReducers = combineReducers({
    report,
    user,
})

export default __demoReducers