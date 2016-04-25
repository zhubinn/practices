import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

//关键词搜索
const ACCOUNT_STATISTIC_SEARCH = 'ACCOUNT_STATISTIC_SEARCH'
//输入框值改变
const ACCOUNT_STATISTIC_INPUTVAL = 'ACCOUNT_STATISTIC_INPUTVAL'

//输入框值改变
export const changeInputVal = (value)=>{
    return {
        type: ACCOUNT_STATISTIC_INPUTVAL,
        payload:value
    }
}

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_STATISTIC_SEARCH,
        payload:value
    }
}



export {
    ACCOUNT_STATISTIC_SEARCH,
    ACCOUNT_STATISTIC_INPUTVAL
}

