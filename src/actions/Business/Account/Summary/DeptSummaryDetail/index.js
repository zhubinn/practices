import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import { Modal,message } from 'antd';

//关键词搜索
const account_SummaryDetail_SEARCH = 'account_SummaryDetail_SEARCH'
//输入框值改变
const account_SummaryDetail_INPUTVAL = 'account_SummaryDetail_INPUTVAL'

//获取列表数据
const account_SummaryDetail_GETDATA = 'account_SummaryDetail_GETDATA'

const account_SummaryDetail_GETDATA_SUCCESS = 'account_SummaryDetail_GETDATA_SUCCESS'

//输入框值改变
export const changeInputVal = (value)=>{
    return {
        type: account_SummaryDetail_INPUTVAL,
        payload:value
    }
}

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: account_SummaryDetail_SEARCH,
        payload:value
    }
}

//获取数据

export const getAccountSummaryDetailData = (params) => {
    const _getAccountSummaryDetailData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountSummaryDetailData(account_SummaryDetail_GETDATA,{}));

            fetch(params.url, {
                credentials: 'include',
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:'params='+JSON.stringify(params.data) 
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server")
                }
                return response.json()
            }).then(function (data) {

                if(data.rs){
                    dispatch(_getAccountSummaryDetailData(account_SummaryDetail_GETDATA_SUCCESS, data.data))
                }else{
                    message.config({
                      top: 250
                    });             
                    message.error(data.error);
                }
            })
        
    
    }
}


export {
    account_SummaryDetail_SEARCH,
    account_SummaryDetail_INPUTVAL,
    account_SummaryDetail_GETDATA,
    account_SummaryDetail_GETDATA_SUCCESS,

}

