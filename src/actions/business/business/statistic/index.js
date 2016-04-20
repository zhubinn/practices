
/**
 * Created by ytm on 4/17/16.
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 获取数据
const SEACH_DATA = 'SEACH_DATA'
// 改变搜索数据
const ON_CHANGE = 'ON_CHANGE'
// 获取数据成功
const GET_CHANGE_SUCCESS = 'GET_CHANGE_SUCCESS'
// 获取数据失败
const GET_CHANGE_FAILURE = 'GET_CHANGE_FAILURE'

const getDataobj = (params)=> {
    const fetchData = (type, payload, source)=> {
        return {
            type,
            payload,
            source
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(SEACH_DATA, {pending: true, rows: []}))
        fetch(params.url, {
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        }).then(function(response) {
            debugger
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {
            console.log(data)
            debugger
            dispatch(fetchData(GET_CHANGE_SUCCESS, {columns: data.columns, data:data.data}))
        })
    }
}

const onSearch = (val) => {
    return {
        type: ON_CHANGE,
        val
    }
}


const getDataSuccess = () => {

}

const getDataFailure = () => {

}

export {
    SEACH_DATA,
    ON_CHANGE,
    GET_CHANGE_SUCCESS,
    GET_CHANGE_FAILURE,
    getDataobj,
    getDataSuccess,
    getDataFailure,
}