import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import { Modal } from 'antd';

// 输入搜索关键词
const account_DeptSummary_INPUTVAL = 'account_DeptSummary_INPUTVAL'
const account_DeptSummary_SEARCH = 'account_DeptSummary_SEARCH'

//获取报表数据
const account_DeptSummary_GETDATA = 'account_DeptSummary_GETDATA'
const account_DeptSummary_GETDATA_SUCCESS = 'account_DeptSummary_GETDATA_SUCCESS'
//输入搜索关键词

//搜索输入框改变

export const changeInputVal = (value)=>{
    return {
        type: account_DeptSummary_INPUTVAL,
        payload:value
    }
}


export const searchKeyWord = (value)=>{
    return {
        type: account_DeptSummary_SEARCH,
        payload:value
    }
}

//获取数据

export const getAccountDeptSummaryData = (params) => {
    console.log(params.url)
    const _getAccountDeptSummaryData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountDeptSummaryData(account_DeptSummary_GETDATA,'params='));

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
                    dispatch(_getAccountDeptSummaryData(account_DeptSummary_GETDATA_SUCCESS, data.data))
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
    account_DeptSummary_SEARCH,
    account_DeptSummary_INPUTVAL,
    account_DeptSummary_GETDATA,
    account_DeptSummary_GETDATA_SUCCESS,

}

