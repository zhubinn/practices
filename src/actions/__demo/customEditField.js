
const ADD_FIELD = 'ADD_FIELD'
const DELETE_FIELD = 'DELETE_FIELD'
const SET_STATUS_FIELD = 'SET_STATUS_FIELD'
const APPLY_FIELD = 'APPLY_FIELD'
//[
//    {
//        id:
//        filedName:'',
//        status:0
//    }
//]



export function addField(text) {
    return { type: ADD_FIELD, text }
}

export function deleteField(id) {
    return { type: DELETE_FIELD, id }
}

export function setFieldStatus(id) {
    return { type: SET_STATUS_FIELD, id }
}

export function applyField(id, text) {
    return { type: SET_STATUS_FIELD, id, text }
}
