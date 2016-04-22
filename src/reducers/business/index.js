/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'
import account_list from './account/list'
import account_Customizable from './account/Customizable'
import account_statistic from './account/Statistic'
import account_deptsummary from './account/Summary/DeptSummary'
import account_persummary from './account/Summary/PerSummary'
import account_detail from './account/Detail'

const businessReducers = combineReducers({
    account_list,
    account_Customizable,
    account_statistic,
    account_deptsummary,
    account_persummary,
    account_detail,
})

export default businessReducers