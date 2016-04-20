import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 改变是否穿透状态
const ACCOUNT_SUMMARY_SEARCH = 'ACCOUNT_SUMMARY_SEARCH'

//改变是否穿透状态
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_SUMMARY_SEARCH,
        payload:value
    }
}


export {
    ACCOUNT_SUMMARY_SEARCH
}

