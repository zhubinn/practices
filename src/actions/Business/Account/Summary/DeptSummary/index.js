import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import { Modal ,message} from 'antd';
import reqwest from 'components/Business/Reqwest'

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
    const _getAccountDeptSummaryData = (type, data)=> {
        return {
            type,
            payload: data,
        }
    }


    return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getAccountDeptSummaryData(account_DeptSummary_GETDATA,'params='));
        
        reqwest({
            url: params.url,
            type: 'json',
            method: 'post',
            data: {
                params: JSON.stringify(params.data)
            }
        }).then(function (data) {
            if(data.rs){
                dispatch(_getAccountDeptSummaryData(account_DeptSummary_GETDATA_SUCCESS, data.data))
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
    account_DeptSummary_SEARCH,
    account_DeptSummary_INPUTVAL,
    account_DeptSummary_GETDATA,
    account_DeptSummary_GETDATA_SUCCESS,

}

