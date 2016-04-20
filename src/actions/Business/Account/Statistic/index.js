import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 改变是否穿透状态
const CK_UPDATEISPENE = 'CK_UPDATEISPENE'

//改变是否穿透状态
export const updateIsPene = ()=>{
    return {
        type: CK_UPDATEISPENE,
        payload:''
    }
}


export {
    CK_UPDATEISPENE
}

