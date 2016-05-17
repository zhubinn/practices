import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import { Modal ,message} from 'antd';

//关键词搜索
const account_StatisticDetail_SEARCH = 'account_StatisticDetail_SEARCH'
//输入框值改变
const account_StatisticDetail_INPUTVAL = 'account_StatisticDetail_INPUTVAL'

//获取列表数据
const account_StatisticDetail_GETDATA = 'account_StatisticDetail_GETDATA'

const account_StatisticDetail_GETDATA_SUCCESS = 'account_StatisticDetail_GETDATA_SUCCESS'

//输入框值改变
export const changeInputVal = (value)=>{
    return {
        type: account_StatisticDetail_INPUTVAL,
        payload:value
    }
}

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: account_StatisticDetail_SEARCH,
        payload:value
    }
}

//获取数据

export const getAccountStatisticDetailData = (params) => {
    const _getAccountStatisticDetailData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountStatisticDetailData(account_StatisticDetail_GETDATA,{}));

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
                    dispatch(_getAccountStatisticDetailData(account_StatisticDetail_GETDATA_SUCCESS, data.data))
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
    account_StatisticDetail_SEARCH,
    account_StatisticDetail_INPUTVAL,
    account_StatisticDetail_GETDATA,
    account_StatisticDetail_GETDATA_SUCCESS,

}

