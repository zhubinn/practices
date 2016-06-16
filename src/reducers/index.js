/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import components from './components'

import business from './business'

import __demo from './__demo'


const rootReducer = combineReducers({
    components,
    business,
    routing,
    __demo,
})
export default rootReducer