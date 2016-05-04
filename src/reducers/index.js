/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

<<<<<<< HEAD
import components from './components'
import __demo from './__demo'

import report from './__demo/report'
import user from './__demo/user'
import hello from './__demo/hello'
import customEditField from './__demo/customEditField'

import reportOther from './report/index'


=======
import report from './__demo/report'
import user from './__demo/user'


import components from './components'
>>>>>>> 67735e9052d7b14e4f020428b0034b128bcb478f
import business from './business'
import __demo from './__demo'


const rootReducer = combineReducers({
    components,
    business,
    __demo,
<<<<<<< HEAD
=======
    business,
>>>>>>> 67735e9052d7b14e4f020428b0034b128bcb478f
    routing,
    hello,
    customEditField,
})
export default rootReducer