import { FETCH_DATA, FETCH_DEPT_DATA, CLICK_DISPATCH_BUTTON, SELECT_CHANGE, SELECTED_DEPT_CHANGE, CLICK_TAB_HEADER, FETCH_SEARCH_SUGGEST , CHANGE_SEARCH_SUGGEST } from '../../../constants/dispatchCluesTypes'
import Immutable from 'immutable'

const $$initialState = {
            dispatchState:0, // 0 未分派(默认) 1已分派
            showModal:false,
            rowData:[],
            selectData:[],
            deptData:[],
            suggestData:[]
}


export default function dispatchCluesState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case FETCH_DATA:
            return $$state.merge({
                "loading":action.loading,
                "rowData":action.data
            });
        case CLICK_TAB_HEADER:
            return $$state.merge({
                "loading":action.loading,
                "dispatchState":action.state
            });
        case FETCH_DEPT_DATA:
            return $$state.merge({
                "loading":action.loading,
                "deptData":action.data
            });
        case CLICK_DISPATCH_BUTTON:
            //可以直接使用返回過來的data
            //return $$state.merge(action.data);
            return $$state.merge({
                "showModal":action.isShowModal
            });
        case SELECT_CHANGE:
            return $$state.merge({
                "selectData":action.selectedRows
            });
        case SELECTED_DEPT_CHANGE:
            return $$state.merge({
                "selectedRadioID":action.value
            });
        case FETCH_SEARCH_SUGGEST:
            return $$state.merge({
                "suggestData":action.data
            });
        default:
            return $$state
    }
}
