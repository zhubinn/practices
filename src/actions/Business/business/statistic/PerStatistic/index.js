
/**
 * Created by ytm on 4/17/16
 */
import reqwest from 'components/Business/Reqwest'
import { routerMiddleware, push } from 'react-router-redux'

// 获取生意部门统计数据
const GET_PERSTATISTIC_DATA = 'GET_DEPTSTATISTIC_DATA'
// 获取生意部门统计成功
const GET_PERSTATISTIC_SUCCESS = 'GET_DEPTSTATISTIC_SUCCESS'
// 获取生意部门统计失败
const GET_PERSTATISTIC_FAILURE = 'GET_DEPTSTATISTIC_FAILURE'


const getPerStatisticData = (params ,val) => {
    const fetchData = (type, payload) => {
        return {
            type,
            payload
        }
    }

    return (dispatch, getState) => {
        dispatch(fetchData(GET_PERSTATISTIC_DATA))

        reqwest({
            url: params.url,
            type: 'json',
            method: 'post',
            data: {
                params: JSON.stringify(params.data)
            }
        })
        .then(function (data) {
            if(data.rs){
                dispatch(fetchData(GET_PERSTATISTIC_SUCCESS, {data: data}))
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
    GET_PERSTATISTIC_DATA,
    GET_PERSTATISTIC_SUCCESS,
    GET_PERSTATISTIC_FAILURE,
    getPerStatisticData,
}