/*import {
 FETCH_DATA,
 FETCH_DEPT_DATA,
 CLICK_DISPATCH_BUTTON,
 SELECT_CHANGE,
 SELECTED_DEPT_CHANGE,
 CLICK_TAB_HEADER,
 FETCH_SEARCH_SUGGEST ,
 CHANGE_SEARCH_SUGGEST,
 UPDATE_TABLE_DATA
 } from '../../constants/clues/dispatchCluesTypes'*/

const FETCH_DATA = 'FETCH_DATA'
const FETCH_DEPT_DATA = 'FETCH_DEPT_DATA'
const CLICK_DISPATCH_BUTTON = 'CLICK_DISPATCH_BUTTON'
const SELECT_CHANGE = 'SELECT_CHANGE'
const SELECTED_DEPT_CHANGE = 'SELECTED_DEPT_CHANGE'
const CLICK_TAB_HEADER = 'CLICK_TAB_HEADER'
const CHANGE_SEARCH_SUGGEST = 'CHANGE_SEARCH_SUGGEST'
const FETCH_SEARCH_SUGGEST = 'FETCH_SEARCH_SUGGEST'
const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA'

export function fetchData(loading, data) {
    return {type: FETCH_DATA, loading, data}
}

export function fetchDeptData(loading, data) {
    return {type: FETCH_DEPT_DATA, loading, data}
}

export function showDispatchModal(isShowModal) {
    return {type: CLICK_DISPATCH_BUTTON, isShowModal}
}

export function selectChange(selectedRowKeys, selectedRows) {
    return {type: SELECT_CHANGE, selectedRowKeys, selectedRows}
}

export function selectDeptChange(value) {
    return {type: SELECTED_DEPT_CHANGE, value}
}

export function clickTab(state, loading) {
    return {type: CLICK_TAB_HEADER, state, loading}
}

export function fetchSuggestData(data) {
    return {type: FETCH_SEARCH_SUGGEST, data}
}

export function changeSearchSuggest(value) {
    return {type: CHANGE_SEARCH_SUGGEST, value}
}

export function updateTableData(selectIDs) {
    return {type: UPDATE_TABLE_DATA, selectIDs}
}

