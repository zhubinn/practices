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


const GET_TABLE_QUERY = 'GET_TABLE_QUERY'

const GET_TABLE_QUERY_SUCCESS = 'GET_TABLE_QUERY_SUCCESS'

const GET_TABLE_QUERY_FAILURE = 'GET_TABLE_QUERY_FAILURE'


const GET_PERMISSION = 'GET_PERMISSION'

const GET_PERMISSION_SUCCESS = 'GET_PERMISSION_SUCCESS'

const GET_PERMISSION_FAILURE = 'GET_PERMISSION_FAILURE'


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

let permission_params = {
    url: '',
    type: 'all'
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
                Modal.error({
                    title: '出错了',
                    content: data.error || '',
                });
            }

        }).fail(function (err, msg) {

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
                Modal.error({
                    title: '出错了',
                    content: data.error || '',
                });
            }

        }).fail(function (err, msg) {

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