/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
    COMPONENT_SEARCH_GETDATA,
    COMPONENT_SEARCH_GETDATA_SUCCESS,
    COMPONENT_SEARCH_GETDATA_FAILURE,
    COMPONENT_SEARCH_GETDATA_ERROR_NETWORK,
    COMPONENT_CLICK_GETDATA,
    COMPONENT_TAG_UPDATEDATA,
    COMPONENT_TAG_DELETEDATA,
    COMPONENT_SEARCH_ITEMDATA,
    COMPONENT_SUBMITBTN,
    COMPONENT_CANCLEBTN,
    COMPONENT_LOADMORE_GETDATA,
    COMPONENT_LOADMORE_GETDATA_SUCCESS,
    COMPONENT_CHANGEINPUT
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
        case 'COMPONENT_INIT_SOURCEPEOPLE':
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
        case 'COMPONENT_CHANGE_ISMUTISELECT':
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsMultiselect:action.payload})
            })
        case COMPONENT_SEARCH_GETDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsShow:true,itemdata:[]})
            })
        case COMPONENT_SEARCH_GETDATA_SUCCESS:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({data:action.payload,IsShow:true})
            })

        case COMPONENT_SEARCH_GETDATA_FAILURE:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })

        case COMPONENT_CLICK_GETDATA:
            return $$state.updateIn([action.source], function (source) {
                 return source.merge({itemdata:action.payload.itemdata,
                    areapadding:action.payload.areapadding,
                    textValue:''})
            })

        case COMPONENT_TAG_UPDATEDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case COMPONENT_TAG_DELETEDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case COMPONENT_SEARCH_ITEMDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case COMPONENT_CANCLEBTN:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsShow:false})
            })
        case COMPONENT_SUBMITBTN:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })

        case COMPONENT_LOADMORE_GETDATA:
            return $$state

        case COMPONENT_LOADMORE_GETDATA_SUCCESS:
            return $$state.updateIn([action.source], function (source) {
                return source.merge(action.payload)
            })
        case COMPONENT_CHANGEINPUT:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({textValue:action.payload})
            })
        default:
            return $$state
    }
}


export default searchPeople