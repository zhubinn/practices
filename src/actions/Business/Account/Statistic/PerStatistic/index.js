import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

//关键词搜索
const account_Pertatistic_SEARCH = 'account_Pertatistic_SEARCH'
//输入框值改变
const account_Pertatistic_INPUTVAL = 'account_Pertatistic_INPUTVAL'

//获取列表数据
const account_Pertatistic_GETDATA = 'account_Pertatistic_GETDATA'

const account_Pertatistic_GETDATA_SUCCESS = 'account_Pertatistic_GETDATA_SUCCESS'

//输入框值改变
export const changeInputVal = (value)=>{
    return {
        type: account_Pertatistic_INPUTVAL,
        payload:value
    }
}

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: account_Pertatistic_SEARCH,
        payload:value
    }
}

//获取数据

export const getAccountPerStatisticData = (params) => {
    console.log(params.url)
    const _getAccountPerStatisticData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountPerStatisticData(account_Pertatistic_GETDATA,{}));

            fetch(params.url, {
                credentials: 'include',
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },                
                body: 'params='+JSON.stringify(params.data)
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server")
                }
                return response.json()
            }).then(function (data) {

                if(data.rs){
                    dispatch(_getAccountPerStatisticData(account_Pertatistic_GETDATA_SUCCESS, data.data))
                }
            })
        
    
    }
}


export {
    account_Pertatistic_SEARCH,
    account_Pertatistic_INPUTVAL,
    account_Pertatistic_GETDATA,
    account_Pertatistic_GETDATA_SUCCESS,

}

