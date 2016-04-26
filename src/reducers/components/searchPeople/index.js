/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
    COMPONENT_SEARCH_GETDATA,
    COMPONENT_GETPEOPLEDATA,
    COMPONENT_GETPEOPLEDATA_SUCCESS,
    COMPONENT_CLICK_GETDATA,
    COMPONENT_TAG_UPDATEDATA,
    COMPONENT_TAG_DELETEDATA,
    COMPONENT_SEARCH_ITEMDATA,
    COMPONENT_SUBMITBTN,
    COMPONENT_CANCLEBTN,
    COMPONENT_LOADMORE_GETDATA,
    COMPONENT_LOADMORE_GETDATA_SUCCESS,
    COMPONENT_CHANGEINPUT,
    COMPONENT_CHANGE_PAGE
} from 'actions/Component/SearchPeople'

const $$initialstate = Immutable.fromJS({
    source:'',
    default:{
        data:[],
        itemdata:[],
        IsShow:false,
        IsMultiselect:0,
        areapadding:0,
        chosedNameData:[],
        textValue:'',
        params:{},
        page:1,
        confirmOkParams:{}
    }
})

 const searchPeople = ($$state = $$initialstate, action) => {
    switch(action.type) {
        case 'COMPONENT_INIT_SOURCEPEOPLE':
            return $$state.merge({
                source:action.source,
                [action.source]: Immutable.fromJS({
                    data:[],
                    itemdata:[],
                    IsShow:false,
                    IsMultiselect:0,
                    areapadding:0,
                    chosedNameData:[],
                    textValue:'',
                    params:action.payload.getDataParams,
                    confirmOkParams:action.payload.confirmOkParams,
                    page:1
                })
            })
        case COMPONENT_CHANGE_PAGE:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({page:action.payload})
            })
        case 'COMPONENT_CHANGE_ISMUTISELECT':
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsMultiselect:action.payload})
            })
        case COMPONENT_GETPEOPLEDATA:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({IsShow:true})
            })
        case COMPONENT_GETPEOPLEDATA_SUCCESS:
            return $$state.updateIn([action.source], function (source) {
                return source.merge({data:action.payload,IsShow:true})
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
                return source.merge({IsShow:false})
            })

        case COMPONENT_LOADMORE_GETDATA:
            return $$state

        case COMPONENT_LOADMORE_GETDATA_SUCCESS:
            const currentData = $$state.get(action.source).toJS().data
            let totalData = currentData.concat(action.payload)
            return $$state.updateIn([action.source], function (source) {
                return source.merge({data:totalData})
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