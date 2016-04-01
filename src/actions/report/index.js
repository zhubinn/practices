
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'


const CK_REPORT_UPDATE = 'CK_REPORT_UPDATE'

const update = ()=> {

    return (dispatch, getState) => {
        dispatch({
            type: CK_REPORT_UPDATE,
            payload: {
                data: 2
            }
        })
    }
}

export {
    update
}