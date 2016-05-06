
/**
 * Created by ytm on 4/17/16
 */

import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import {Modal} from 'antd'

// 数据日志页码长度改变
const DATALOG_SIZE_CHANGE = 'DATALOG_SIZE_CHANGE'

// 获取数据日志报表
const GET_DATALOG_DATA = 'GET_DATALOG_DATA'
// 获取数据日志报表成功
const GET_DATALOG_SUCCESS = 'GET_DATALOG_SUCCESS'
// 获取数据日志报表失败
const GET_DATALOG_FAILURE = 'GET_DATALOG_FAILURE'

//获取数据日志高级搜索
const GET_DATALOG_QUERY = 'GET_DATALOG_QUERY'
//获取数据日志高级搜索成功
const GET_DATALOG_QUERY_SUCCESS = 'GET_DATALOG_QUERY_SUCCESS'

// 导出弹框
const EXPORT_DATALOG_SHOW = 'EXPORT_DATALOG_SHOW'
const EXPORT_DATALOG_HIDE = 'EXPORT_DATALOG_HIDE'

let table_params = {
    url: '',
    data: {
        page: 1,
        pageSize: 10,
        searchData: [],
        type: 'all'
    }
}

// let table_query_url = ''

const pageSizeChange = (val) => {
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }
    return (dispatch, getState) => {
        dispatch(fetchData(DATALOG_SIZE_CHANGE, data))
    }
}

const exportShow = () => {
    const fetchData = (type)=> {
        return {
            type
        }
    }
    return (dispatch, getState) => {
        dispatch(fetchData(EXPORT_DATALOG_SHOW))
    }
}

const exportHide = () => {
    const fetchData = (type)=> {
        return {
            type
        }
    }
    return (dispatch, getState) => {
        dispatch(fetchData(EXPORT_DATALOG_HIDE))
    }
}

const getDataLogData = (params) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_DATALOG_DATA))
        fetch(table_params.url = params.url || table_params.url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'params=' +JSON.stringify(Object.assign(table_params.data, params.data))
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {
         
            if(data.rs){
                data.data.rowData = data.data.rowData || []
                data.data.total = data.data.total || 0;
                data.data.current = data.data.current || 0;
                data.data.pageSize = data.data.pageSize || 10;
                dispatch( fetchData(GET_DATALOG_SUCCESS, {data: data}) )
            }else{
                Modal.info({
                    title: '错误信息',
                    content: data.error,
                    onOk() {
                    }
                });
            }
        })
    }
}

const getDataLogQuery = (url)=> {
    const fetchData = (type, payload)=> {

        return {
            type,
            payload
        }
    }



    /*
     *     body:  Object.assign(table_params.data, params.data)
     *    */
    debugger
    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATALOG_QUERY, {queryColumns: {}}))

        fetch(table_query_url = url || table_query_url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: ''
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {
            debugger
            dispatch(fetchData(GET_DATALOG_QUERY_SUCCESS, {
                data: data.data
            }))

        })

    }
}
export {
    DATALOG_SIZE_CHANGE,
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_FAILURE,
    EXPORT_DATALOG_SHOW,
    EXPORT_DATALOG_HIDE,
    GET_DATALOG_QUERY,
    GET_DATALOG_QUERY_SUCCESS,
    
    getDataLogData,
    getDataLogQuery,
    pageSizeChange,
    exportShow,
    exportHide,
}