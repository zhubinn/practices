/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'


//搜索框值改变
const CK_INPUT_CHANGE = 'CK_INPUT_CHANGE'

const handleInputChange = (val) => {
    return (dispatch, getState) => {
        dispatch({
            type: CK_INPUT_CHANGE,
            val,
        })
    }
}

export {
    CK_INPUT_CHANGE,
    handleInputChange,
}