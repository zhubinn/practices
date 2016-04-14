/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

<<<<<<< HEAD
import report from './__demo/report'
import user from './__demo/user'
import hello from './__demo/hello'
import customEditField from './__demo/customEditField'
import numberReportViewState from './numberReport/numberReportView'
import reportOther from './report/index'

const rootReducer = combineReducers({
	reportOther,
    report,
    user,
=======
import components from './components'
import __demo from './__demo'

const rootReducer = combineReducers({
    components,
    __demo,
>>>>>>> edea6834b571935104b73013b17a1c07db74ebc5
    routing,
    hello,
    customEditField,
    numberReportViewState
})
export default rootReducer