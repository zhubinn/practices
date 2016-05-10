/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'

import datalog from "./log/datalog"
import FuncLog from "./log/funclog"

import deptstatistic from "./business/statistic/deptstatistic"
import perstatistic from "./business/statistic/perstatistic"
import deptsummary from "./business/summary/deptstatistic"
import persummary from "./business/summary/perstatistic"

import account_list_dept from './account/list/dept'
import account_list_person from './account/list/person'
import account_detail_person from './account/detail/person'
import account_detail_dept from './account/detail/dept'

const businessReducers = combineReducers({
	deptstatistic,
	perstatistic,
	datalog,
	FuncLog,
	account_detail_dept,
    account_detail_person,
    account_list_dept,
    account_list_person
})

export default businessReducers
