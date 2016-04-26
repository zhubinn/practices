/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'
import numberReportViewState from './numberReport/numberReportView'
import dispatchCluesState from './dispatchClues/dispatchClues'

const businessReducers = combineReducers({
    account_list,
    numberReportViewState,
    dispatchCluesState

})

export default businessReducers