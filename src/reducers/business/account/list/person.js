/**
 * Created by janeluck on 4/25/16.
 */

import Immutable from 'immutable'
import {    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    GET_TABLE_QUERY,
    GET_TABLE_QUERY_SUCCESS,
    GET_TABLE_QUERY_FAILURE,
    GET_PERMISSION,
    GET_PERMISSION_SUCCESS,
    GET_PERMISSION_FAILURE,


} from 'actions/business/account/list/person'
import {
    COMPONENTS_CHANGE_ISMUTISELECT,
    COMPONENTS_CHANGE_ISSHOWMODAL,
    COMPONENTS_GETPEOPLEDATA,
    COMPONENTS_GETPEOPLEDATA_SUCCESS,
    COMPONENTS_GETNEXTPEOPLEDATA,
    COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS,
    COMPONENTS_ISCHANGEBUSINESS,
    COMPONENTS_ISCHANGECONTACT

} from 'actions/__demo/selectPeople'
const $$initialState = Immutable.fromJS({
    rows: [],
    current: 1,
    total: 20,
    pageSize: 20,
    queryColumns: {},
    loading: false,
    IsMultiselect:0,
    selectPeopleModal:false,
    data:[],
    permission:{}

})

export default function account_list_dept($$state = $$initialState, action) {
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
                loading: action.payload.loading
            })
        case GET_TABLE_DATA_FAILURE:
            return $$state
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

        case GET_PERMISSION:
            return $$state
        case GET_PERMISSION_SUCCESS:
            return $$state.merge({
                permission: action.payload.permission
            })
        case GET_PERMISSION_FAILURE:
            return $$state


        case COMPONENTS_CHANGE_ISMUTISELECT:
            return $$state.merge({
                IsMultiselect: action.payload,
                selectPeopleModal:true
            })
        case COMPONENTS_CHANGE_ISSHOWMODAL:
            return $$state.merge({
                selectPeopleModal:false
            })
        case COMPONENTS_GETPEOPLEDATA :
            return $$state
        case COMPONENTS_GETPEOPLEDATA_SUCCESS:
            return $$state.merge({
                data:action.payload
            })

        case COMPONENTS_GETNEXTPEOPLEDATA :
            return $$state
        case COMPONENTS_GETNEXTPEOPLEDATA_SUCCESS:

            const currentData = $$state.toJS().data
            const totalData = currentData.concat(action.payload)
            return $$state.merge({data:totalData})
        default:
            return $$state
    }
}