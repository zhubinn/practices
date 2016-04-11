
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'


const pageChangeAction = (pageIndex, pageSize) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_CHANGE',
            pageIndex,
            pageSize
        })
    }
}

const customizableAction = (index, val) => {
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

export {
    pageChangeAction,
    customizableAction,
    addItem,
    delItem,
}