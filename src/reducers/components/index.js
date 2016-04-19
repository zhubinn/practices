/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import __examples from './__examples'
import dataTable from './dataTable'
import searchInput from './searchInput'

const componentReducers = combineReducers({
    __examples,
    dataTable,
    searchInput,
})

export default componentReducers