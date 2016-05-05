
/**
 * Created by ytm on 4/17/16
 */
import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'


// 数据日志页码长度改变
const FUNCLOG_SIZE_CHANGE = 'FUNCLOG_SIZE_CHANGE'
// 获取数据日志报表
const GET_FUNCLOG_DATA = 'GET_FUNCLOG_DATA'
// 获取数据日志报表成功
const GET_FUNCLOG_SUCCESS = 'GET_FUNCLOG_SUCCESS'
// 获取数据日志报表失败
const GET_FUNCLOG_FAILURE = 'GET_FUNCLOG_FAILURE'


const pageSizeChange = (val) => {
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }
    return (dispatch, getState) => {
        dispatch(fetchData(FUNCLOG_SIZE_CHANGE, {pageSize: val.pageSize, page: val.current}))
    }
}

const getFuncLogData = (params ,val)=> {
    const fetchData = (type, payload)=> {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_FUNCLOG_DATA))
        debugger
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
                dispatch(fetchData(GET_FUNCLOG_SUCCESS, {data: data}))
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
    FUNCLOG_SIZE_CHANGE,
    GET_FUNCLOG_DATA,
    GET_FUNCLOG_SUCCESS,
    GET_FUNCLOG_FAILURE,
    getFuncLogData,
    pageSizeChange,
}