import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 输入搜索关键词
const ACCOUNT_PERSUMMARY_INPUTVAL = 'ACCOUNT_PERSUMMARY_INPUTVAL'

//点击搜索按钮
const ACCOUNT_PERSUMMARY_SEARCH = 'ACCOUNT_PERSUMMARY_SEARCH'

const ACCOUNT_PERSUMMARY_CHANGEPENE = 'ACCOUNT_PERSUMMARY_CHANGEPENE'


//搜索输入框改变

export const changeInputVal = (value)=>{
    return {
        type: ACCOUNT_PERSUMMARY_INPUTVAL,
        payload:value
    }
}




//点击搜索按钮
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_PERSUMMARY_SEARCH,
        payload:value
    }
}

//记录是否穿透状态
export const changePene = ()=>{
    return {
        type: ACCOUNT_PERSUMMARY_CHANGEPENE,
        payload:''
    }
}

export {
    ACCOUNT_PERSUMMARY_SEARCH,
    ACCOUNT_PERSUMMARY_CHANGEPENE,
    ACCOUNT_PERSUMMARY_INPUTVAL
}

