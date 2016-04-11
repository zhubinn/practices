import fetch from 'isomorphic-fetch'
import { routerMiddleware, push}
from 'react-router-redux'


const pageChangeAction = (pageIndex, pageSize) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_CHANGE',
            pageIndex,
            pageSize
        })
    }
}

const editItem = (index, val) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_CUSTOM_EDIT',
            index,
            val,
        })
    }
}

const addItem = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_CUSTOM_ADD',
            index,
        })
    }
}

const delItem = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_CUSTOM_DEL',
            index,
        })
    }
}

const switchItem = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_CUSTOM_SWITCH',
            index,
        })
    }
}
export {
    pageChangeAction,
    editItem,
    addItem,
    delItem,
    switchItem,
}