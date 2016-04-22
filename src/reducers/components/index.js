/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import __examples from './__examples'
import QueryNestedTable from './QueryNestedTable'

const componentReducers = combineReducers({
    __examples,
    QueryNestedTable,
})

export default componentReducers