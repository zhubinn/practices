/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
    CK_SEARCH_GETDATA,
    CK_SEARCH_GETDATA_SUCCESS,
    CK_SEARCH_GETDATA_FAILURE,
    CK_SEARCH_GETDATA_ERROR_NETWORK,
    CK_CLICK_GETDATA,
    CK_TAG_UPDATEDATA,
    CK_TAG_DELETEDATA,
    CK_SEARCH_ITEMDATA,
    CK_SUBMITDATA,
    CK_LOADMORE_GETDATA,
    CK_LOADMORE_GETDATA_SUCCESS
} from 'actions/SearchPeople/searchPeople'

export const searchPeople = (state = Immutable.Map({data:[],itemdata:[],IsShow:true}), action) => {
    let payload = action.payload

    switch(action.type) {
        case CK_SEARCH_GETDATA:
            return state.merge({ pending: true })
        case CK_SEARCH_GETDATA_SUCCESS:
            return state.merge(action.payload,{ itemdata:[],areapadding:0,chosedNameData:[]})
        case CK_SEARCH_GETDATA_FAILURE:
            return state.merge(action.payload, { pending: false })
        case CK_CLICK_GETDATA:
            return state.merge(action.payload)
        case CK_TAG_UPDATEDATA:
            return state.merge(action.payload)
        case CK_TAG_DELETEDATA:
            return state.merge(action.payload)
        case CK_SEARCH_ITEMDATA:
            return state.merge(action.payload)
        case CK_SUBMITDATA:
            return state.merge(action.payload,{IsShow:false})
        case CK_LOADMORE_GETDATA:
            return state.merge({ pending: true })
        case CK_LOADMORE_GETDATA_SUCCESS:
            return state.merge(action.payload) 
        default:
            return state
    }
}


export default searchPeople