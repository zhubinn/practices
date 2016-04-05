/**
 * Created by janeluck on 4/5/16.
 */
export function addTodo(text)  {
    return {
        type: 'ADD_TODO',
        text
    }
}

export  function changeStatus(i)  {
    return {
        type: 'CHANGE_STATUS',
        i
    }
}
export function showCompleted(text)  {
    return {
        type: 'SHOW_COMPLETED'
    }
}

export  function showAll(i)  {
    return {
        type: 'SHOW_ALL'
    }
}

