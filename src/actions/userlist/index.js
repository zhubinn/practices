
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

const perAction = ()=> {

    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_PRE',
        })
    }
}

const nextAction = ()=> {

    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_NEXT',
        })
    }
}

const indexAction = (index)=> {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_INDEX',
            pageIndex:index,
        })
    }
}

const pageGoAction = (index)=> {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_GO',
            pageIndex:index,
        })
    }
}

export {
    perAction,
    nextAction,
    indexAction,
    pageGoAction,
}