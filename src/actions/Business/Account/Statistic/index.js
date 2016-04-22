import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

const ACCOUNT_STATISTIC_SEARCH = 'ACCOUNT_STATISTIC_SEARCH'

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_STATISTIC_SEARCH,
        payload:value
    }
}



export {
    ACCOUNT_STATISTIC_SEARCH
}

