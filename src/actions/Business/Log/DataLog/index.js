
/**
 * Created by ytm on 4/17/16
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 数据日志页码长度改变
const DATALOG_SIZE_CHANGE = 'DATALOG_SIZE_CHANGE'
// 获取数据日志报表
const GET_DATALOG_DATA = 'GET_DATALOG_DATA'
// 获取数据日志报表成功
const GET_DATALOG_SUCCESS = 'GET_DATALOG_SUCCESS'
// 获取数据日志报表失败
const GET_DATALOG_FAILURE = 'GET_DATALOG_FAILURE'


const pageSizeChange = (val) => {
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }
    return (dispatch, getState) => {
        dispatch(fetchData(DATALOGSIZE_CHANGE, {pageSize: val.pageSize, page: val.current}))
    }
}

const getDataLogData = (params ,val)=> {
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_DATALOG_DATA, {pending: true, rows: []}))
        fetch(params.url, {
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {
            debugger
            dispatch(fetchData(GET_DATALOG_SUCCESS, {columns: data.columns, data:data.data}))
        })
    }
}

export {
    DATALOG_SIZE_CHANGE,
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_FAILURE,
    getDataLogData,
    pageSizeChange,
}