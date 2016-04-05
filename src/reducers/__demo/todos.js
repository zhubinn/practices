/**
 * Created by janeluck on 4/5/16.
 */
const todos = (state = {items: [], showFilter:'ALL'}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                items: [
                    ...state.items,
                    {
                        text: action.text,
                        completed: false
                    }

                ],
                showFilter:  state.showFilter
            }
        case 'CHANGE_STATUS':
            return {
                items: [
                    ...(state.items.slice(0, action.i)),
                    Object.assign({}, state.items[action.i], {completed: !state.items[action.i].completed}),
                    ...(state.items.slice(action.i+1))
                ],

                showFilter:  state.showFilter
            }
        case 'SHOW_COMPLETED':
            return {
                items: state.items,
                showFilter: 'COMPLETED'

            }
        case 'SHOW_ALL':
            return {
                items: state.items,
                showFilter: 'ALL'

            }

        default:
            return state
    }
}

export default todos