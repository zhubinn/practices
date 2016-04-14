/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import __examples from './__examples'
//import nestedtable from './NestedTable'

const componentReducers = combineReducers({
    __examples,
    //nestedtable,
})

export default componentReducers