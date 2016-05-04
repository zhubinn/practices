/**
 * Created by chenhf on 16-4-13.
 */
import { combineReducers } from 'redux'

import datalog from "./log/datalog"
import FuncLog from "./log/funclog"
import deptstatistic from "./business/deptstatistic"
import account_list_dept from './account/list/dept'
import account_list_person from './account/list/person'
import account_detail_person from './account/detail/person'

const businessReducers = combineReducers({
	deptstatistic,
	datalog,
	FuncLog,
    account_detail_person,
    account_list_dept,
    account_list_person
})

export default businessReducers
