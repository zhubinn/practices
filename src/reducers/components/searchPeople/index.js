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
} from 'actions/Component/SearchPeople'

const $$initialstate = Immutable.fromJS({
    default:{
        data:[],
        itemdata:[],
        IsShow:false,
        IsMultiselect:0,
        areapadding:0,
        chosedNameData:[],
        textValue:''
    }
})

 const searchPeople = ($$state = $$initialstate, action) => {
    switch(action.type) {
        case 'INIT_SOURCEPEOPLE':
            return $$state.merge({
                [action.source]: Immutable.fromJS({
                    data:[],
                    itemdata:[],
                    IsShow:false,
                    IsMultiselect:0,
                    areapadding:0,
                    chosedNameData:[],
                    textValue:''
                })
            })
        case 'CHANGE_ISMUTISELECT':
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsMultiselect:action.payload})
            })
        case CK_SEARCH_GETDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsShow:true,itemdata:[]})
            })
        case CK_SEARCH_GETDATA_SUCCESS:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({data:action.payload,IsShow:true})
            })

        case CK_SEARCH_GETDATA_FAILURE:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })

        case CK_CLICK_GETDATA:
            return $$state.updateIn([action.source], function (source) {
                 return source.merge({itemdata:action.payload.itemdata,
                    areapadding:action.payload.areapadding,
                    textValue:''})
            })

        case CK_TAG_UPDATEDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case CK_TAG_DELETEDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case CK_SEARCH_ITEMDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case CK_CANCLEBTN:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsShow:false})
            })
        case CK_SUBMITBTN:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })

        case CK_LOADMORE_GETDATA:
            return $$state

        case CK_LOADMORE_GETDATA_SUCCESS:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case CK_CHANGEINPUT:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({textValue:action.payload})
            })
        default:
            return $$state
    }
}


export default searchPeople