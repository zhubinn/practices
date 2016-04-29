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




let table_params = {
    url: '',
    data: {
        page: 1,
        rowsPerPage: 0,
        searchData: {}
    }
}



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

        dispatch(fetchData(GET_TABLE_DATA, {pending: true, rows: []}))
        // todo: 封装
        fetch(table_params.url = params.url || table_params.url, {

            method: 'post',
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'params='+ JSON.stringify(Object.assign(table_params.data, params.data))
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function (data) {

            dispatch(fetchData(GET_TABLE_DATA_SUCCESS, {
                rows: data.data.rowData,
                current: data.data.currentPage,
                total: data.data.total,
                pending: false
            }))

        })

    }
}




export {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    getTableData
}