import fetch from 'isomorphic-fetch'
import { routerMiddleware, push} from 'react-router-redux'

//分页改变页数
const CK_PAGE_CHANGE = 'CK_PAGE_CHANGE'

const pageChangeAction = (pageIndex, pageSize) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_PAGE_CHANGE,
            pageIndex,
            pageSize
        })
    }
}

export {
    CK_PAGE_CHANGE,
    pageChangeAction,
}