import { FETCH_DATA, FETCH_DEPT_DATA, CLICK_DISPATCH_BUTTON, SELECT_CHANGE, SELECTED_DEPT_CHANGE, CLICK_TAB_HEADER, FETCH_SEARCH_SUGGEST , CHANGE_SEARCH_SUGGEST } from '../../constants/dispatchCluesTypes'

export function fetchData(loading,data) {
    return { type: FETCH_DATA,loading, data }
}

export function fetchDeptData(loading,data) {
    return { type: FETCH_DEPT_DATA,loading, data  }
}

export function showDispatchModal(isShowModal) {
    return { type: CLICK_DISPATCH_BUTTON,isShowModal }
}

export function selectChange(selectedRowKeys,selectedRows) {
    return { type: SELECT_CHANGE ,selectedRowKeys ,selectedRows }
}

export function selectDeptChange(value) {
    return { type: SELECTED_DEPT_CHANGE ,value }
}

export function clickTab(state,loading) {
    return { type: CLICK_TAB_HEADER ,state,loading }
}

export function fetchSuggestData(data){
    return { type:FETCH_SEARCH_SUGGEST ,data }
}

export function changeSearchSuggest(value){
    return { type:CHANGE_SEARCH_SUGGEST ,value }
}
