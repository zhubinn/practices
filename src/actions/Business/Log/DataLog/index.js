
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

const getDataLogData = (params ,val) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_DATALOG_DATA))
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

export {
    DATALOG_SIZE_CHANGE,
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_FAILURE,
    getDataLogData,
    pageSizeChange,
}