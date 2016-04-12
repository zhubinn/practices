/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import report from './__demo/report'
import user from './__demo/user'
import searchPeople from './searchPeople/searchPeople'
import Customizable from './CustomizablePage/CustomizablePage'


const rootReducer = combineReducers({
    report,
    user,
    routing,
    searchPeople,
    Customizable,

})

export default rootReducer