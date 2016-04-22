import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 输入搜索关键词
const ACCOUNT_SUMMARY_SEARCH = 'ACCOUNT_SUMMARY_SEARCH'

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_SUMMARY_SEARCH,
        payload:value
    }
}


export {
    ACCOUNT_SUMMARY_SEARCH
}

