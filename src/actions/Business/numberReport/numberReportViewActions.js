import { FETCH_DATA, CLICK_PREV_NEXT_BUTTON, CLICK_SURE_DATER_BUTTON, IMPORT_BUTTON } from '../../../constants/numberReport/numberReportViewTypes'

export function fetchData(loading,data) {
    return { type: FETCH_DATA,loading, data  }
}

export function prevNextClick(curInputValue) {
    return { type: CLICK_PREV_NEXT_BUTTON, curInputValue }
}

export function nextClick(curInputValue,data) {
    return { type: CLICK_PREV_NEXT_BUTTON, curInputValue, data }
}

export function importClick(curInputValue) {
    return { type: IMPORT_BUTTON, curInputValue }
}


