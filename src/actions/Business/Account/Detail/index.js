import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

const ACCOUNT_DETAIL_SEARCH = 'ACCOUNT_STATISTIC_SEARCH'

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_DETAIL_SEARCH,
        payload:value
    }
}



export {
    ACCOUNT_DETAIL_SEARCH
}

