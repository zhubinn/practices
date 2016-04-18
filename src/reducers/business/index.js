/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'
import numberReportViewState from './numberReport/numberReportView'

const businessReducers = combineReducers({
    account_list,
    numberReportViewState,
})

export default businessReducers