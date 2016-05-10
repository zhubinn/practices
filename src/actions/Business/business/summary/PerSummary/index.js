
/**
 * Created by ytm on 4/17/16
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 获取生意部门统计数据
const GET_PERSUMMARY_DATA = 'GET_PERSUMMARY_DATA'
// 获取生意部门统计成功
const GET_PERSUMMARY_SUCCESS = 'GET_PERSUMMARY_SUCCESS'
// 获取生意部门统计失败
const GET_PERSUMMARY_FAILURE = 'GET_PERSUMMARY_FAILURE'


const getPerSummaryData = (params ,val) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_PERSUMMARY_DATA))
        fetch(params.url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'params=' + JSON.stringify(params.data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {
            dispatch( fetchData(GET_PERSUMMARY_SUCCESS, {data: data}) )
        })
    }
}

export {
    GET_PERSUMMARY_DATA,
    GET_PERSUMMARY_SUCCESS,
    GET_PERSUMMARY_FAILURE,
    getPerSummaryData,
}