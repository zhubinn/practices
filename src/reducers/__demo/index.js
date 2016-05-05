/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'

import report from './report'
import user from './user'
import selectPeople from './selectPeople'



const __demoReducers = combineReducers({
    report,
    user,
    selectPeople,
})

export default __demoReducers