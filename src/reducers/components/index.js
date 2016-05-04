/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import __examples from './__examples'

import dataTable from './dataTable'
import searchPeople from './searchPeople'

import QueryNestedTable from './QueryNestedTable'

const componentReducers = combineReducers({
    __examples,
    dataTable,
    searchPeople,
    QueryNestedTable,
})

export default componentReducers
