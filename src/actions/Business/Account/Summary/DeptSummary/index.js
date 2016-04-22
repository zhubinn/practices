import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 输入搜索关键词
const ACCOUNT_DEPTSUMMARY_INPUTVAL = 'ACCOUNT_DEPTSUMMARY_INPUTVAL'
const ACCOUNT_DEPTSUMMARY_SEARCH = 'ACCOUNT_DEPTSUMMARY_SEARCH'

const ACCOUNT_DEPTSUMMARY_CHANGEPENE = 'ACCOUNT_DEPTSUMMARY_CHANGEPENE'

//输入搜索关键词

//搜索输入框改变

export const changeInputVal = (value)=>{
    return {
        type: ACCOUNT_DEPTSUMMARY_INPUTVAL,
        payload:value
    }
}



export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_DEPTSUMMARY_SEARCH,
        payload:value
    }
}


export const changeDeptPene = ()=>{
    return {
        type: ACCOUNT_DEPTSUMMARY_CHANGEPENE,
        payload:''
    }
}
export {
    ACCOUNT_DEPTSUMMARY_SEARCH,
    ACCOUNT_DEPTSUMMARY_INPUTVAL,
    ACCOUNT_DEPTSUMMARY_CHANGEPENE
}

