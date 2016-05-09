/**
 * Created by janeluck on 4/7/16.
 */

import fetch from 'isomorphic-fetch'



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
        // todo: 封装
        var data = new FormData();
        data.append( "json", 1);
        data.append( "json2", 1);
        fetch(table_params.url = params.url || table_params.url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                //'Content-Type': 'application/json'
            },
            //body: JSON.stringify(Object.assign(table_params.data, params.data))
            //body: data
            //body: [['key', 'value'].join('='), ['key', 'value'].join('=')].join('&')
            body: 'params=' +JSON.stringify(Object.assign(table_params.data, params.data))
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {

            dispatch(fetchData(GET_TABLE_DATA_SUCCESS, {

                rows: data.data.rowData,
                current: data.data.current,
                total: data.data.total,
                pageSize: data.data.pageSize,
                loading: false
            }))

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

            dispatch(fetchData(GET_TABLE_QUERY_SUCCESS, {
                queryColumns: data.data
            }))

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
}


{
    page: 1
    pageSize:1

}