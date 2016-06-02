
/**
 * Created by ytm on 4/17/16
 */
import reqwest from 'components/Business/Reqwest'
import { routerMiddleware, push } from 'react-router-redux'

// 获取生意部门统计数据
const GET_STATISTICDETAIL_DATA = 'GET_STATISTICDETAIL_DATA'
// 获取生意部门统计成功
const GET_STATISTICDETAIL_SUCCESS = 'GET_STATISTICDETAIL_SUCCESS'
// 获取生意部门统计失败
const GET_STATISTICDETAIL_FAILURE = 'GET_STATISTICDETAIL_FAILURE'

//获取高级搜索
const GET_STATISTICDETAIL_QUERY = 'GET_STATISTICDETAIL_QUERY'
//获取高级搜索成功
const GET_STATISTICDETAILQUERY_SUCCESS = 'GET_STATISTICDETAILQUERY_SUCCESS'

let table_params = {
    url: '',
    data: {
        searchData: [],
        type: 'all'
    }
}

let table_query_url = ''

const getStatisticDetailData = (params ,val) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_STATISTICDETAIL_DATA))

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
                dispatch(fetchData(GET_STATISTICDETAIL_SUCCESS, {data: data}))
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


// const getStatisticDetailQuery = (url)=> {
//     const fetchData = (type, payload)=> {

//         return {
//             type,
//             payload
//         }
//     }

//     /**
//      *  body:  Object.assign(table_params.data, params.data)
//     **/
//     return (dispatch, getState) => {

//         dispatch(fetchData(GET_STATISTICDETAIL_QUERY, {queryColumns: {}}))

//         fetch(table_query_url = url || table_query_url, {
//             method: 'POST',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },

//             body: ''
//         }).then(function(response) {
//             if (response.status >= 400) {
//                 throw new Error("Bad response from server")
//             }
//             return response.json()
//         }).then(function (data) {
//             dispatch(fetchData(GET_STATISTICDETAILQUERY_SUCCESS, {
//                 data: data.data
//             }))

//         })

//     }
// }
export {
    GET_STATISTICDETAIL_DATA,
    GET_STATISTICDETAIL_SUCCESS,
    GET_STATISTICDETAIL_FAILURE,
    GET_STATISTICDETAIL_QUERY,
    GET_STATISTICDETAILQUERY_SUCCESS,
    getStatisticDetailData
}