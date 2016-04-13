import { FETCH_DATA, CLICK_PREV_BUTTON, CLICK_NEXT_BUTTON, IMPORT_BUTTON } from '../../constants/numberReportViewTypes'

export function fetchDate(data) {
    return { type: FETCH_DATA, data  }
}

export function prevClick(curInputValue,data) {
    return { type: CLICK_PREV_BUTTON, curInputValue ,data }
}

export function nextClick(curInputValue,data) {
    return { type: CLICK_NEXT_BUTTON, curInputValue, data }
}

export function importClick(curInputValue) {
    return { type: IMPORT_BUTTON, curInputValue }
}


