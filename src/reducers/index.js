/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

<<<<<<< HEAD
import report from './__demo/report'
import user from './__demo/user'
import DemoPagination from './__demo/DemoPagination'
=======
import components from './components'
import __demo from './__demo'
>>>>>>> edea6834b571935104b73013b17a1c07db74ebc5

const rootReducer = combineReducers({
    components,
    __demo,
    routing,
    DemoPagination,
})
export default rootReducer