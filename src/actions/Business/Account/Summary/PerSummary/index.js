import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

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
    console.log(params.url)
    const _getAccountPerSummaryData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountPerSummaryData(account_Persummary_GETDATA,'params='));

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
                    dispatch(_getAccountPerSummaryData(account_Persummary_GETDATA_SUCCESS, data.data))
                }
            })
        
    
    }
}

export {
    account_Persummary_SEARCH,
    account_Persummary_INPUTVAL,
    account_Persummary_GETDATA,
    account_Persummary_GETDATA_SUCCESS,

}

