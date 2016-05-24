
import fetch from 'isomorphic-fetch'
const FETCH_DATA = 'FETCH_DATA'
const FETCH_DEPT_DATA = 'FETCH_DEPT_DATA'
const CLICK_DISPATCH_BUTTON = 'CLICK_DISPATCH_BUTTON'
const SELECT_CHANGE = 'SELECT_CHANGE'
const SELECTED_DEPT_CHANGE = 'SELECTED_DEPT_CHANGE'
const CLICK_TAB_HEADER = 'CLICK_TAB_HEADER'
const CHANGE_SEARCH_SUGGEST = 'CHANGE_SEARCH_SUGGEST'
const FETCH_SEARCH_SUGGEST = 'FETCH_SEARCH_SUGGEST'
const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA'

export function fetchData(loading, data) {
    return {type: FETCH_DATA, loading, data}
}

export function fetchDeptData(loading, data) {
    return {type: FETCH_DEPT_DATA, loading, data}
}

export function showDispatchModal(isShowModal) {
    return {type: CLICK_DISPATCH_BUTTON, isShowModal}
}

export function selectChange(selectedRowKeys, selectedRows) {
    return {type: SELECT_CHANGE, selectedRowKeys, selectedRows}
}

export function selectDeptChange(value) {
    return {type: SELECTED_DEPT_CHANGE, value}
}

export function clickTab(state, loading) {
    return {type: CLICK_TAB_HEADER, state, loading}
}

export function fetchSuggestData(data) {
    return {type: FETCH_SEARCH_SUGGEST, data}
}

export function changeSearchSuggest(value) {
    return {type: CHANGE_SEARCH_SUGGEST, value}
}

export function updateTableData(selectIDs) {
    return {type: UPDATE_TABLE_DATA, selectIDs}
}






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
        page : 1,
        rowsPerPage: 0,
        pageSize: 0,
        searchData: [],
        owner:'',
        assigned: 0
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

            if(data.rs){

                dispatch(fetchData(GET_TABLE_DATA_SUCCESS, {

                    rows: data.data.rowData,
                    current: data.data.current,
                    total: data.data.total,
                    pageSize: data.data.pageSize,
                    loading: false
                }))
            }else{
                dispatch(fetchData(GET_TABLE_DATA_FAILURE,{loading: false}))
            }



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
    table_params,
    }