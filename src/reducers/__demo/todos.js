/**
 * Created by janeluck on 4/5/16.
 */
const todos = (state = {items: []}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                items: [
                    ...state.items,
                    action.text
                ]
            }

        default:
            return state
    }
}

export default todos