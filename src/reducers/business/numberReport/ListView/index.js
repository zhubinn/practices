/*import {
    FETCH_DATA,
    CLICK_PREV_NEXT_BUTTON,
    CLICK_SURE_DATER_BUTTON,
    IMPORT_BUTTON
} from '../../../constants/numberReport/numberReportViewTypes'*/

const FETCH_DATA = 'FETCH_DATA'
const CLICK_PREV_NEXT_BUTTON = 'CLICK_PREV_NEXT_BUTTON'
const CLICK_SURE_DATER_BUTTON = 'CLICK_SURE_DATER_BUTTON'
const IMPORT_BUTTON = 'IMPORT_BUTTON'

import Immutable from 'immutable'

const $$initialState = {
            loading:false,
            data:{
                obj:{
                    reportItems: []
                },
                list:[{
                    reportItems: []
                }]
            }
}


export default function numberReportViewState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case FETCH_DATA:
            return $$state.merge({
                "loading":action.loading,
                "data":action.data
            });
        case CLICK_PREV_NEXT_BUTTON:
            //可以直接使用返回過來的data
            //return $$state.merge(action.data);
            return $$state.merge({
                "loading":false,
                "dater":action.curInputValue
            });
        case CLICK_SURE_DATER_BUTTON:
            return $$state.merge({
                "dater":action.curInputValue
            });

        case IMPORT_BUTTON:
            state.splice(action.id,1);
            return [...$$state];

        default:
            return $$state
    }
}
