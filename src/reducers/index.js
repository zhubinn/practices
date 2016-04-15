/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import components from './components'
import __demo from './__demo'
import business from './business'

const rootReducer = combineReducers({
    components,
    business,
    __demo,
    routing,
})

export default rootReducer