/**
 * Created by janeluck on 4/5/16.
 */
export default function addTodo(text)  {
    return {
        type: 'ADD_TODO',
        text
    }
}