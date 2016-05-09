/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'



import datalog from "./log/datalog"
import FuncLog from "./log/funclog"

import deptstatistic from "./business/deptstatistic"



import numberReportViewState from './numberReport/numberReportView'
import dispatchCluesState from './dispatchClues/dispatchClues'


import account_Customizable from './account/Customizable'
import account_deptstatistic from './account/Statistic/DeptStatistic'
import account_deptstatisticdetail from './account/Statistic/DeptStatisticDetail'
import account_perstatistic from './account/Statistic/PerStatistic'
import account_deptsummary from './account/Summary/DeptSummary'
import account_persummary from './account/Summary/PerSummary'
import account_deptsummarydetail from './account/Summary/DeptSummaryDetail'


import account_list_dept from './account/list/dept'
import account_list_person from './account/list/person'
import account_detail_person from './account/detail/person'
import account_detail_dept from './account/detail/dept'



import datalog from "./log/datalog"
import FuncLog from "./log/funclog"
import deptstatistic from "./business/deptstatistic"


const businessReducers = combineReducers({

    numberReportViewState,
    dispatchCluesState,
    
    account_Customizable,
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
    datalog,
    FuncLog,

})


export default businessReducers

