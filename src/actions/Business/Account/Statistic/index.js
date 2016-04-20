import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 改变是否穿透状态
const ACCOUNT_STATISTIC_UPDATEISPENE = 'ACCOUNT_STATISTIC_UPDATEISPENE'

const ACCOUNT_STATISTIC_SEARCH = 'ACCOUNT_STATISTIC_SEARCH'
//改变是否穿透状态
export const updateIsPene = ()=>{
    return {
        type: ACCOUNT_STATISTIC_UPDATEISPENE,
        payload:''
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
	ACCOUNT_STATISTIC_UPDATEISPENE,
    ACCOUNT_STATISTIC_SEARCH
}

