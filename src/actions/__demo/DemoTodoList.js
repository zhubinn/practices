import fetch from 'isomorphic-fetch'
import { routerMiddleware, push} from 'react-router-redux'

//列表增删改
const CK_CUSTOM_ADD = 'CK_CUSTOM_ADD'
const CK_CUSTOM_DEL = 'CK_CUSTOM_DEL'
const CK_CUSTOM_EDIT = 'CK_CUSTOM_EDIT'
const CK_CUSTOM_SWITCH = 'CK_CUSTOM_SWITCH'
const CK_CUSTOM_MOVEUP = 'CK_CUSTOM_MOVEUP'
const CK_CUSTOM_MOVEDOWN = 'CK_CUSTOM_MOVEDOWN'

//是否必填
const CK_CUSTOM_ENABLE = 'CK_CUSTOM_ENABLE'


const addItem = (index) => {
    return {
        type: CK_CUSTOM_ADD,
        index,
    }
}

const delItem = (index) => {
    return {
        type: CK_CUSTOM_DEL,
        index,
    }
}

const editItem = (index, val) => {
    return {
        type: CK_CUSTOM_EDIT,
        index,
        val,
    }
}

const switchItem = (index) => {
    return {
        type: CK_CUSTOM_SWITCH,
        index,
    }
}

const isRequired = (enable) => {
    return {
        type: CK_CUSTOM_ENABLE,
        enable,
    }
}


const moveUpAct = (index) => {
    return {
        type: CK_CUSTOM_MOVEUP,
        index,
    }
}

const moveDownAct = (index) => {
    return {
        type: CK_CUSTOM_MOVEDOWN,
        index,
    }
}
//异步写法
// const moveDownAct = (index) => {
//     return (dispatch, getState) => {
//         dispatch({
//             type: CK_CUSTOM_MOVEDOWN,
//             index,
//         })
//     }
// }

export {
    CK_CUSTOM_ADD,
    CK_CUSTOM_DEL,
    CK_CUSTOM_EDIT,
    CK_CUSTOM_SWITCH,
    CK_CUSTOM_ENABLE,
    CK_CUSTOM_MOVEUP,
    CK_CUSTOM_MOVEDOWN,
    editItem,
    addItem,
    delItem,
    switchItem,
    isRequired,
    moveUpAct,
    moveDownAct,
}