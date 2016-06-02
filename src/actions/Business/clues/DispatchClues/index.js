
import reqwest from 'components/Business/Reqwest'
import { Modal  } from 'antd'


const FETCH_DEPT_DATA = 'FETCH_DEPT_DATA'
const SELECT_CHANGE = 'SELECT_CHANGE'
const SELECTED_DEPT_CHANGE = 'SELECTED_DEPT_CHANGE'
const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA'



export function fetchDeptData(loading, data) {
    return {type: FETCH_DEPT_DATA, loading, data}
}


export function selectChange(selectedRowKeys, selectedRows) {
    return {type: SELECT_CHANGE, selectedRowKeys, selectedRows}
}

export function selectDeptChange(value) {
    return {type: SELECTED_DEPT_CHANGE, value}
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


export {
    GET_TABLE_DATA,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAILURE,
    getTableData,

    FETCH_DEPT_DATA,
    SELECT_CHANGE,
    SELECTED_DEPT_CHANGE,
    UPDATE_TABLE_DATA,

    table_params,
    }