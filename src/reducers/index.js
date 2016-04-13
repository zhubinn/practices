/**
 * Created by c on 16/3/21.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

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
    routing,
    hello,
    customEditField,
    numberReportViewState
})
export default rootReducer