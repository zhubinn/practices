import { INPUT_CHANGE_FIELD, ADD_FIELD, DELETE_FIELD, APPLY_FIELD, SET_STATUS_FIELD } from '../../constants/customFieldTypes'


export function inputChange(text,id) {
    return { type: INPUT_CHANGE_FIELD, text ,id }
}

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
