/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import __examples from './__examples'
import dataTable from './dataTable'

const componentReducers = combineReducers({
    __examples,
    dataTable,
})

export default componentReducers