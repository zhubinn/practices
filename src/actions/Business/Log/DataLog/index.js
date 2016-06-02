
/**
 * Created by ytm on 4/17/16
 */
import reqwest from 'components/Business/Reqwest'
import { routerMiddleware, push } from 'react-router-redux'
import {Modal} from 'antd'

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


let table_params = {
    url: '',
    data: {
        page: 1,
        pageSize: 0,
        searchData: [],
        type: 'all'
    }
}

let table_query_url = ''

const getDataLogData = (params) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATALOG_DATA))

        reqwest({
            url: table_params.url = params.url || table_params.url,
            type: 'json',
            method: 'post',
            data: {
                params: JSON.stringify(Object.assign(table_params.data, params.data))
            }
        })
        .then(function (data) {
            if(data.rs){
                data.data.rowData = data.data.rowData || []
                data.data.total = data.data.total || 0;
                data.data.current = data.data.current || 0;
                data.data.pageSize = data.data.pageSize || 10;
                dispatch(fetchData(GET_DATALOG_SUCCESS, {data: data}))
            }else{
                Modal.error({
                    title: '出错了',
                    content: data.error
                });
            }
        })
        .fail(function (err, msg) {
            Modal.error({
                title: '出错了',
                content: '服务器错误，请联系管理员',
            });
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

    return (dispatch, getState) => {

        dispatch(fetchData(GET_DATALOG_QUERY, {queryColumns: {}}))
        
        reqwest({
            url: table_query_url = url || table_query_url,
            type: 'json',
            method: 'post',
            data: {}
        })
        .then(function (data) {
            if(data.rs){
                dispatch(fetchData(GET_DATALOG_QUERY_SUCCESS, {
                    data: data.data
                }))
            }else{
                Modal.error({
                    title: '出错了',
                    content: data.error
                });
            }
        })
        .fail(function (err, msg) {
            Modal.error({
                title: '出错了',
                content: '服务器错误，请联系管理员',
            });
        })

    }
}
export {
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_QUERY,
    GET_DATALOG_QUERY_SUCCESS,
    
    getDataLogData,
    getDataLogQuery,
}