/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'

import report from './report'
import user from './user'
import DemoPagination from './DemoPagination'
import DemoTodoList from './DemoTodoList'





const __demoReducers = combineReducers({
    report,
    user,
    DemoPagination,
    DemoTodoList,
    selectPeople
})

export default __demoReducers