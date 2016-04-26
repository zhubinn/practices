import { FETCH_DATA, FETCH_DEPT_DATA, CLICK_DISPATCH_BUTTON, SELECT_CHANGE } from '../../../constants/dispatchCluesTypes'
import Immutable from 'immutable'

const $$initialState = {
            showModal:false,
            rowData:[],
            selectData:[],
            deptData:[]
}


export default function dispatchCluesState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case FETCH_DATA:
            return $$state.merge({
                "loading":action.loading,
                "rowData":action.data
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

        default:
            return $$state
    }
}
