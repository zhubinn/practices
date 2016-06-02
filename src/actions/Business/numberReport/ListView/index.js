/*import {
    FETCH_DATA,
    CLICK_PREV_NEXT_BUTTON,
    CLICK_SURE_DATER_BUTTON,
    IMPORT_BUTTON
} from '../../../constants/numberReport/numberReportViewTypes'*/

import reqwest from 'components/Business/Reqwest'
import { Modal  } from 'antd'


const CLICK_PREV_NEXT_BUTTON = 'CLICK_PREV_NEXT_BUTTON'

const prevNextClick = (curInputValue) => {
    return { type: CLICK_PREV_NEXT_BUTTON, curInputValue }
}




// 获取数据
const GET_TABLE_DATA = 'GET_TABLE_DATA'
// 获取数据成功
const GET_TABLE_DATA_SUCCESS = 'GET_TABLE_DATA_SUCCESS'
// 获取数据失败
const GET_TABLE_DATA_FAILURE = 'GET_TABLE_DATA_FAILURE'



let table_params = {
    url: '',
    data: {
        page : 1,
        pageSize: 0,
        searchData: [],
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

                    rows: data.data.list,
                    current: data.data.current,
                    total: data.data.total,
                    pageSize: data.data.pageSize,
                    columns:data.data.columns,
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
    table_params,
    CLICK_PREV_NEXT_BUTTON,
    prevNextClick,
    }
