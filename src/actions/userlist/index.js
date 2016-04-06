
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

const indexAction = ()=> {

    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_INDEX',
        })
    }
}

export {
    perAction,
    nextAction,
    indexAction,
}