import { FETCH_DATA, CLICK_DISPATCH_BUTTON } from '../../constants/dispatchCluesTypes'

export function fetchData(loading,data) {
    return { type: FETCH_DATA,loading, data  }
}

export function prevNextClick(curInputValue) {
    return { type: CLICK_DISPATCH_BUTTON, curInputValue }
}


