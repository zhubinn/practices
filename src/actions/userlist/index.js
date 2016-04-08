
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// const pageChangeAction = (pageIndex, pageSize)=> {

//         dispatch({
//             type: 'CK_PAGE_CHANGE',
//             pageIndex: pageIndex,
//             pageSize: pageSize
//         })
        
//     return (dispatch, getState) => {
//         request(url)
//         .then(function(){

//         dispatch({
//             type: 'CK_PAGE_CHANGE',
//             pageIndex: pageIndex,
//             pageSize: pageSize
//         })
//         })
//     }
// }

const pageChangeAction = (pageIndex, pageSize)=> {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_CHANGE',
            pageIndex: pageIndex,
            pageSize: pageSize
        })
    }
}

export {
    pageChangeAction,
}