import fetch from 'isomorphic-fetch'
import { routerMiddleware, push} from 'react-router-redux'

//分页改变页数
const CK_PAGE_CHANGE = 'CK_PAGE_CHANGE'
//列表增删改
const CK_CUSTOM_ADD = 'CK_CUSTOM_ADD'
const CK_CUSTOM_DEL = 'CK_CUSTOM_DEL'
const CK_CUSTOM_EDIT = 'CK_CUSTOM_EDIT'
const CK_CUSTOM_SWITCH = 'CK_CUSTOM_SWITCH'
//是否必填
const CK_CUSTOM_ENABLE = 'CK_CUSTOM_ENABLE'

const pageChangeAction = (pageIndex, pageSize) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_PAGE_CHANGE,
            pageIndex,
            pageSize
        })
    }
}

const addItem = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_CUSTOM_ADD,
            index,
        })
    }
}

const delItem = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_CUSTOM_DEL,
            index,
        })
    }
}

const editItem = (index, val) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_CUSTOM_EDIT,
            index,
            val,
        })
    }
}

const switchItem = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_CUSTOM_SWITCH,
            index,
        })
    }
}

const isRequired = (enable) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_CUSTOM_ENABLE,
            enable,
        })
    }
}

export {
    CK_PAGE_CHANGE,
    CK_CUSTOM_ADD,
    CK_CUSTOM_DEL,
    CK_CUSTOM_EDIT,
    CK_CUSTOM_SWITCH,
    CK_CUSTOM_ENABLE,
    pageChangeAction,
    editItem,
    addItem,
    delItem,
    switchItem,
    isRequired,
}