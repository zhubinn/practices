
/**
 * Created by ytm on 4/17/16
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 改变搜索框数据
const ON_CHANGE = 'ON_CHANGE'

// 获取统计报表数据
const GET_REPORT_DATA = 'GET_REPORT_DATA'
// 获取统计报表数据成功
const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS'
// 获取统计报表数据失败
const GET_REPORT_FAILURE = 'GET_REPORT_FAILURE'
// 获取明细统计表数据
const GET_DETAILS_DATA = 'GET_DETAILS_DATA'
// 获取明细统计表数据成功
const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS'
// 获取明细统计表数据失败
const GET_DETAILS_FAILURE = 'GET_DETAILS_FAILURE'


const onSearch = (val) => {
    return {
        type: ON_CHANGE,
        val
    }
}

const getReportData = (params ,val)=> {
    alert(val);
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_REPORT_DATA, {pending: true, rows: []}))
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
            dispatch(fetchData(GET_REPORT_SUCCESS, {columns: data.columns, data:data.data}))
        })
    }
}

const getDetailsData = (params)=> {
    const fetchData = (type, payload)=> {

        return {
            type,
            payload
        }
    }
    return (dispatch, getState) => {

        dispatch(fetchData(GET_DETAILS_DATA, {pending: true, rows: []}))
        // todo: 封装
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
            dispatch(fetchData(GET_DETAILS_SUCCESS, {columns: data.columns, data:data.data}))
        })

    }
}

export {
    ON_CHANGE,
    GET_REPORT_DATA,
    GET_REPORT_SUCCESS,
    GET_REPORT_FAILURE,
    GET_DETAILS_DATA,
    GET_DETAILS_SUCCESS,
    GET_DETAILS_FAILURE,
    getReportData,
    getDetailsData,
}