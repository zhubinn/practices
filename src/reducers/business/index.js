/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'


import datalog from "./log/datalog"
import FuncLog from "./log/funclog"

import deptstatistic from "./business/deptstatistic"



import numberReportViewState from './numberReport/numberReportView'
import dispatchCluesState from './dispatchClues/dispatchClues'

import account_list_dept from './account/list/dept'
import account_list_person from './account/list/person'
import account_detail_person from './account/detail/person'
import account_detail_dept from './account/detail/dept'



const businessReducers = combineReducers({
	deptstatistic,
	datalog,
	FuncLog,
    numberReportViewState,
    dispatchCluesState,
    account_detail_person,
    account_list_dept,


})

export default businessReducers
