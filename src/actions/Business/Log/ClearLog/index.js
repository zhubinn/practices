
/**
 * Created by ytm on 4/17/16
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

//搜索框值改变
const CK_INPUT_CHANGE = 'CK_INPUT_CHANGE'

// 获取统计报表数据
const GET_REPORT_DATA = 'GET_REPORT_DATA'
// 获取统计报表数据成功
const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS'
// 获取统计报表数据失败
const GET_REPORT_FAILURE = 'GET_REPORT_FAILURE'


const handleInputChange = (val) => {
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }
    return (dispatch, getState) => {
        dispatch(fetchData(CK_INPUT_CHANGE, {pending: true, rows: []}))
    }
}

const getReportData = (params ,val)=> {
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

export {
    CK_INPUT_CHANGE,
    GET_REPORT_DATA,
    GET_REPORT_SUCCESS,
    GET_REPORT_FAILURE,
    handleInputChange,
    getReportData,
}