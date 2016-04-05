/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import report from './__demo/report'
import user from './__demo/user'
import todos from './__demo/todos'

const rootReducer = combineReducers({
    report,
    user,
    todos,
    routing,
})

export default rootReducer