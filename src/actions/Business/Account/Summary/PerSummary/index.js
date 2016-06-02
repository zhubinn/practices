import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import { Modal,message } from 'antd';
import reqwest from 'components/Business/Reqwest'

// 输入搜索关键词
const account_Persummary_INPUTVAL = 'account_Persummary_INPUTVAL'
const account_Persummary_SEARCH = 'account_Persummary_SEARCH'

//获取报表数据
const account_Persummary_GETDATA = 'account_Persummary_GETDATA'
const account_Persummary_GETDATA_SUCCESS = 'account_Persummary_GETDATA_SUCCESS'
//输入搜索关键词

//搜索输入框改变

export const changeInputVal = (value)=>{
    return {
        type: account_Persummary_INPUTVAL,
        payload:value
    }
}


export const searchKeyWord = (value)=>{
    return {
        type: account_Persummary_SEARCH,
        payload:value
    }
}

//获取数据

export const getAccountPerSummaryData = (params) => {
    const _getAccountPerSummaryData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountPerSummaryData(account_Persummary_GETDATA,'params='));        
        
        reqwest({
            url: params.url,
            type: 'json',
            method: 'post',
            data: {
                params: JSON.stringify(params.data)
            }
        }).then(function (data) {
            if(data.rs){
                dispatch(_getAccountPerSummaryData(account_Persummary_GETDATA_SUCCESS, data.data))
            }else{
                message.config({
                  top: 250
                });             
                message.error(data.error);
            }
        }).fail(function (err, msg) {
            Modal.error({
                title:"出错了",
                content:"服务器错误，请联系管理员",
            })
        })
    }
}

export {
    account_Persummary_SEARCH,
    account_Persummary_INPUTVAL,
    account_Persummary_GETDATA,
    account_Persummary_GETDATA_SUCCESS,

}

