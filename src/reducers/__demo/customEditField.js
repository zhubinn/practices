import { ADD_FIELD, DELETE_FIELD, APPLY_FIELD, SET_STATUS_FIELD } from 'actions/__demo/customEditField'

const initialState = [
    {
        text: '',
        status: false,
        id: 0
    }
]

export default function customEditField(state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case ADD_FIELD:
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    status: false,
                    text: action.text
                },
                ...state
            ]

        case DELETE_FIELD:
            return state.filter(todo =>
                todo.id !== action.id
            )

        case SET_STATUS_FIELD:
            return state.filter(todo =>
                todo.id !== action.id
            )

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
