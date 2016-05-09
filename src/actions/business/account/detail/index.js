import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

const ACCOUNT_DETAIL_INPUTVAL = 'ACCOUNT_DETAIL_INPUTVAL'

//获取列表数据
const ACCOUNT_DETAIL_GETDATA = 'ACCOUNT_DETAIL_GETDATA'

const ACCOUNT_DETAIL_GETDATA_SUCCESS = 'ACCOUNT_DETAIL_GETDATA_SUCCESS'

//输入搜索关键词
export const changeInputVal = (value)=>{
    return {
        type: ACCOUNT_DETAIL_INPUTVAL,
        payload:value
    }
}

//获取页面加载数据
/**
 * 获取列表数据
 * @param  
 * @param 
 * @returns {Function}
 */
export const getAccountDetailData = (params) => {
    const _getAccountDetailData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountDetailData(ACCOUNT_DETAIL_GETDATA,{}));

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

                dispatch(_getAccountDetailData(ACCOUNT_DETAIL_GETDATA_SUCCESS, data.rowsData))

            })
        
    
    }
}

export {
    ACCOUNT_DETAIL_INPUTVAL,
    ACCOUNT_DETAIL_GETDATA,
    ACCOUNT_DETAIL_GETDATA_SUCCESS
}

