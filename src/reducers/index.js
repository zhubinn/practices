/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import report from './__demo/report'
import user from './__demo/user'
import searchPeople from './searchPeople/searchPeople'
import Customizable from './CustomizablePage/CustomizablePage'


import components from './components'
import __demo from './__demo'

const rootReducer = combineReducers({
    components,
    __demo,
    routing,
    searchPeople,
    Customizable,

})

export default rootReducer