//import {  INPUT_CHANGE_FIELD, ADD_FIELD, DELETE_FIELD, APPLY_FIELD, SET_STATUS_FIELD } from '../../constants/__demo/customFieldTypes'


export const INPUT_CHANGE_FIELD = 'INPUT_CHANGE_FIELD'
export const ADD_FIELD = 'ADD_FIELD'
export const DELETE_FIELD = 'DELETE_FIELD'
export const SET_STATUS_FIELD = 'SET_STATUS_FIELD'
export const APPLY_FIELD = 'APPLY_FIELD'


const initialState = [
    {
        id: 0,
        status: false,
        text: ''
    }
]

export default function customEditField(state = initialState, action) {

    switch (action.type) {
        case INPUT_CHANGE_FIELD:
            state[action.id].text = action.text;
            return [...state];
        case ADD_FIELD:
            return [
                ...state,
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    status: false,
                    text: action.text
                }
            ]

        case DELETE_FIELD:
            state.splice(action.id,1);
            return [...state];

        case SET_STATUS_FIELD:
            state[action.id].status = !state[action.id].status;
            return [...state];

        case APPLY_FIELD:
            return state.map(todo =>
                todo.id === action.id ?
                    Object.assign({}, todo, { text: action.text }) :
                    todo
            )

        default:
            return state
    }
}
