
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'


const CK_USERLIST_UPDATE = 'CK_USERLIST_UPDATE'

const demoevent = ()=> {

    return (dispatch, getState) => {
        dispatch({
            type: CK_USERLIST_UPDATE,
            payload: {
                data: 3
            }
        })
    }
}

export {
    demoevent
}