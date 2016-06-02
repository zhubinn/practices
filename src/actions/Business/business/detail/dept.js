/**
 * Created by janeluck on 4/7/16.
 */

import reqwest from 'components/Business/Reqwest'
import { Modal  } from 'antd'



// 获取数据
const GET_TABLE_DATA = 'GET_TABLE_DATA'
// 获取数据成功
const GET_TABLE_DATA_SUCCESS = 'GET_TABLE_DATA_SUCCESS'
// 获取数据失败
const GET_TABLE_DATA_FAILURE = 'GET_TABLE_DATA_FAILURE'

// 获取数据
const GET_TABLE_QUERY = 'GET_TABLE_QUERY'
// 获取数据成功
const GET_TABLE_QUERY_SUCCESS = 'GET_TABLE_QUERY_SUCCESS'
// 获取数据失败
const GET_TABLE_QUERY_FAILURE = 'GET_TABLE_QUERY_FAILURE'




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


/**
 * 获取数据
 * @params {url:'', data: {}}
 * @returns {Function}
 */
const getTableData = (params)=> {
    const fetchData = (type, payload)=> {

        return {
            type,
            payload
        }
    }

    /*    const p = new Promise(function (resolve, reject) {
     setTimeout(function () {
     resolve({
     rows: rowsData,
     pending: false
     })
     }, 1000)
     })*/


    /*
     *     body:  Object.assign(table_params.data, params.data)
     *    */
    return (dispatch, getState) => {

        dispatch(fetchData(GET_TABLE_DATA, {rows: [], loading: true}))

        reqwest({
            url: table_params.url = params.url || table_params.url,
            type: 'json',
            method: 'post',
            data: {
                params: JSON.stringify(Object.assign(table_params.data, params.data))
            }
        }).then(function (data) {
            if (data.rs) {
                dispatch(fetchData(GET_TABLE_DATA_SUCCESS, {

                    rows: data.data.rowData,
                    current: data.data.current,
                    total: data.data.total,
                    pageSize: data.data.pageSize,
                    columns:data.data.Label,
                    loading: false
                }))
            } else {
                dispatch(fetchData(GET_TABLE_DATA_FAILURE,{loading: false}))
                Modal.error({
                    title: '出错了',
                    content: data.error || '',
                });
            }

        }).fail(function (err, msg) {

            dispatch(fetchData(GET_TABLE_DATA_FAILURE,{loading: false}))
            Modal.error({
                title: '出错了',
                content: '服务器错误, 请联系管理员',
            });

        })


    }
}
const getTableQuery = (url)=> {
    const fetchData = (type, payload)=> {

        return {
            type,
            payload
        }
    }



    /*
     *     body:  Object.assign(table_params.data, params.data)
     *    */
    return (dispatch, getState) => {


        dispatch(fetchData(GET_TABLE_QUERY, {queryColumns: {}}))

        reqwest({
            url: table_query_url = url || table_query_url,
            type: 'json',
            method: 'post'
        }).then(function (data) {
            if (data.rs) {
                dispatch(fetchData(GET_TABLE_QUERY_SUCCESS, {
                    queryColumns: data.data
                }))
            } else {
                dispatch(fetchData(GET_TABLE_QUERY_FAILURE,{loading: false}))
                Modal.error({
                    title: '出错了',
                    content: data.error || '',
                });
            }

        }).fail(function (err, msg) {
            dispatch(fetchData(GET_TABLE_QUERY_FAILURE,{loading: false}))
            Modal.error({
                title: '出错了',
                content: '服务器错误, 请联系管理员',
            });

        })

    }
}




export {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    getTableData,
    getTableQuery,
    GET_TABLE_QUERY,
    GET_TABLE_QUERY_SUCCESS,
    GET_TABLE_QUERY_FAILURE,
    table_params,
}