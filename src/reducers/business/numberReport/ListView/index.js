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


/*const $$initialState = {
            loading:false,
            data:{
                obj:{
                    reportItems: []
                },
                list:[{
                    reportItems: []
                }]
            }
}*/


import {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    GET_TABLE_QUERY,
    GET_TABLE_QUERY_SUCCESS,
    GET_TABLE_QUERY_FAILURE,

    } from 'actions/business/clues/DispatchClues'


import Immutable from 'immutable'

const $$initialState = {
    rows: [],
    current: 1,
    total: 20,
    pageSize: 0,
    queryColumns: {},
    columns:[],
    loading: false,
}


export default function numberReportViewState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case GET_TABLE_DATA:
            return $$state.merge({
                loading: action.payload.loading
            })
        case GET_TABLE_DATA_SUCCESS:
            return $$state.merge({
                rows: action.payload.rows,
                current: action.payload.current,
                total: action.payload.total,
                pageSize: action.payload.pageSize,
                loading: action.payload.loading,
                columns:action.payload.columns,
            })
        case GET_TABLE_DATA_FAILURE:
            return $$state.merge({
                loading: action.payload.loading
            })
        case GET_TABLE_QUERY:
            return $$state.merge({
                queryColumns: {}
            })
        case GET_TABLE_QUERY_SUCCESS:
            return $$state.merge({
                queryColumns: action.payload.queryColumns
            })
        case GET_TABLE_QUERY_FAILURE:
            return $$state
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
