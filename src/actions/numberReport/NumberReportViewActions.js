import { CLICK_PREV_BUTTON, CLICK_NEXT_BUTTON, IMPORT_BUTTON } from '../../constants/numberReportViewTypes'


export function prevClick(curInputValue) {
    return { type: CLICK_PREV_BUTTON, curInputValue  }
}

export function nextClick(curInputValue) {
    return { type: CLICK_NEXT_BUTTON, curInputValue }
}

export function importClick(curInputValue) {
    return { type: IMPORT_BUTTON, curInputValue }
}


