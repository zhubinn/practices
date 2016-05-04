import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

//关键词搜索
const ACCOUNT_STATISTIC_SEARCH = 'ACCOUNT_STATISTIC_SEARCH'
//输入框值改变
const ACCOUNT_STATISTIC_INPUTVAL = 'ACCOUNT_STATISTIC_INPUTVAL'

//获取列表数据
const ACCOUNT_STATISTIC_GETDATA = 'ACCOUNT_STATISTIC_GETDATA'

const ACCOUNT_STATISTIC_GETDATA_SUCCESS = 'ACCOUNT_STATISTIC_GETDATA_SUCCESS'

//输入框值改变
export const changeInputVal = (value)=>{
    return {
        type: ACCOUNT_STATISTIC_INPUTVAL,
        payload:value
    }
}

//输入搜索关键词
export const searchKeyWord = (value)=>{
    return {
        type: ACCOUNT_STATISTIC_SEARCH,
        payload:value
    }
}

//获取数据

export const getAccountStatisticData = (params) => {
    const _getAccountStatisticData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountStatisticData(ACCOUNT_STATISTIC_GETDATA,{}));

            fetch(params.url, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'API': 1,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params.data)
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server")
                }
                return response.json()
            }).then(function (data) {

                dispatch(_getAccountStatisticData(ACCOUNT_STATISTIC_GETDATA_SUCCESS, data.rowsData))

            })
        
    
    }
}


export {
    ACCOUNT_STATISTIC_SEARCH,
    ACCOUNT_STATISTIC_INPUTVAL,
    ACCOUNT_STATISTIC_GETDATA,
    ACCOUNT_STATISTIC_GETDATA_SUCCESS,

}

