/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'




import numberReportViewState from './numberReport/ListView'
import dispatchCluesState from './clues/DispatchClues'


import account_customizable from './account/customizable'
import account_deptstatistic from './account/statistic/deptStatistic'
import account_deptstatisticdetail from './account/statistic/deptStatisticDetail'
import account_perstatistic from './account/statistic/perStatistic'
import account_deptsummary from './account/summary/deptSummary'
import account_persummary from './account/summary/perSummary'
import account_deptsummarydetail from './account/summary/deptSummaryDetail'

import account_list_dept from './account/list/dept'
import account_list_person from './account/list/person'
import account_detail_person from './account/detail/person'
import account_detail_dept from './account/detail/dept'


import datalog from "./log/datalog"
import FuncLog from "./log/funclog"

import deptstatistic from "./business/statistic/deptstatistic"
import perstatistic from "./business/statistic/perstatistic"
import statisticdetail from "./business/statistic/statisticDetail"

import deptsummary from "./business/summary/deptsummary"
import persummary from "./business/summary/persummary"
import summarydetail from "./business/summary/summaryDetail"
import business_list_dept from './business/list/dept'
import business_list_person from './business/list/person'
import business_detail_penetrate from './business/detail/penetrate'
import business_detail_dept from './business/detail/dept'
import business_detail_person from './business/detail/person'


const businessReducers = combineReducers({
    account_customizable,
    account_deptstatistic,
    account_perstatistic,
    account_deptstatisticdetail,
    account_deptsummary,
    account_persummary,
    account_deptsummarydetail,

    account_list_person,
    account_list_dept,
    account_detail_dept,
    account_detail_person,

    deptstatistic,
    perstatistic,
    statisticdetail,
    deptsummary,
    persummary,
    summarydetail,
    business_list_dept,
    business_list_person,
    business_detail_penetrate,
    business_detail_dept,
    business_detail_person,

    numberReportViewState,
    dispatchCluesState,

    datalog,
    FuncLog,
})


export default businessReducers

