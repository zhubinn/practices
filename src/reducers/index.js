/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import report from './__demo/report'
import user from './__demo/user'


import components from './components'
import business from './business'
import __demo from './__demo'

const rootReducer = combineReducers({
    components,
    business,
    __demo,
    routing,
})
export default rootReducer