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
    CK_SUBMITBTN,
    CK_CANCLEBTN,
    CK_LOADMORE_GETDATA,
    CK_LOADMORE_GETDATA_SUCCESS,
    CK_CHANGEINPUT
} from 'actions/SearchPeople/searchPeople'

const $$initialstate = Immutable.fromJS({
    data:[],
    itemdata:[],
    IsShow:true,
    IsMultiselect:0
})

 const searchPeople = ($$state = $$initialstate, action) => {
    switch(action.type) {
        case CK_SEARCH_GETDATA:
            return $$state.merge({ pending: true })
        case CK_SEARCH_GETDATA_SUCCESS:
            return $$state.merge(action.payload,{ itemdata:[],areapadding:0,chosedNameData:[]})
        case CK_SEARCH_GETDATA_FAILURE:
            return $$state.merge(action.payload, { pending: false })
        case CK_CLICK_GETDATA:
            return $$state.merge(action.payload,{textValue:''})
        case CK_TAG_UPDATEDATA:
            return $$state.merge(action.payload)
        case CK_TAG_DELETEDATA:
            return $$state.merge(action.payload)
        case CK_SEARCH_ITEMDATA:
            return $$state.merge(action.payload)
        case CK_CANCLEBTN:
            return $$state.merge({IsShow:false})
        case CK_SUBMITBTN:
            return $$state.merge(action.payload)

        case CK_LOADMORE_GETDATA:
            return $$state.merge({ pending: true })
        case CK_LOADMORE_GETDATA_SUCCESS:
            return $$state.merge(action.payload) 
        case CK_CHANGEINPUT:
            return $$state.merge({textValue:action.payload})
        default:
            return $$state
    }
}


export default searchPeople