import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'
import { message, Button } from 'antd';
import {FormData} from 'form-data'
// 选择某一个字段编辑
const ACCOUNT_CUSTOM_SELECTEDROWDATA = 'ACCOUNT_CUSTOM_SELECTEDROWDATA'

//关闭模态层
const ACCOUNT_CUSTOM_SETTINGCLOSE = 'ACCOUNT_CUSTOM_SETTINGCLOSE'

//切换tab
const ACCOUNT_CUSTOM_CHANGETAB = 'ACCOUNT_CUSTOM_CHANGETAB'

//改变是否必填
const ACCOUNT_CUSTOM_CHANGEISREQUIRED = 'ACCOUNT_CUSTOM_CHANGEISREQUIRED'

//获取自定义字段列表数据
const ACCOUNT_CUSTOM_TABLE_GETDATA ='ACCOUNT_CUSTOM_TABLE_GETDATA'
const ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS = 'ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS'

//增加一行编辑项
const ACCOUNT_CUSTOM_ADDITEM = 'ACCOUNT_CUSTOM_ADDITEM'

//删除一行编辑项
const ACCOUNT_CUSTOM_DELETEITEM = 'ACCOUNT_CUSTOM_DELETEITEM'

//改变输入框值
const ACCOUNT_CUSTOM_CHANGRINPUTVALUE = 'ACCOUNT_CUSTOM_CHANGRINPUTVALUE'

//改变启用未启用状态
const ACCOUNT_CUSTOM_CHANGEISWORK = 'ACCOUNT_CUSTOM_CHANGEISWORK'

//点击应用
const ACCOUNT_CUSTOM_APPLY_BTN = 'ACCOUNT_CUSTOM_APPLY_BTN'

const ACCOUNT_CUSTOM_SETTINGCANCLE = 'ACCOUNT_CUSTOM_SETTINGCANCLE'

//
const ACCOUNT_CUSTOM_UPITEM = 'ACCOUNT_CUSTOM_UPITEM'
const ACCOUNT_CUSTOM_DOWNITEM = 'ACCOUNT_CUSTOM_DOWNITEM'


const DATAITEM = 'DATAITEM'

export const dataItem = (data)=>{
    return {
        type: DATAITEM,
        payload: data
    }
}
/**
 * 点击列表数据
 * @param  
 * @param 
 * @returns {Function}
 */
 export const getTableData = (params) => {
    const _getTableData = (type, data)=> {
        return {
            type,
            payload: data
        }
    }
        return (dispatch, getState) => {
        const url = params.url;
        dispatch(_getTableData(ACCOUNT_CUSTOM_TABLE_GETDATA,'req='));

            fetch(params.url, {
                credentials: 'include',
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'req='+JSON.stringify(params.data)
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server")
                }
                return response.json()
            }).then(function (data) {
                if(data.rs){
                    dispatch(_getTableData(ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS, data.data))
                }
            })
        
    
    }
}


export const selectedRowData = (selectedRow,editColumnsOptions)=>{
    let localeditColumnsOptions = []
    editColumnsOptions.map((r,i)=>{
        if(r.IsDeleted == 0){
            localeditColumnsOptions.push(r)
        }
    })
    if(editColumnsOptions.length == 0){
        let editColumnsOptions = [
            {
                Val:"",//枚举值.
                IsStop:0,//1：停用 0：启用.
                IsSys:1,//是否是系统属性.
                IsDeleted:0
            }
        ]
        return {
            type:ACCOUNT_CUSTOM_SELECTEDROWDATA,
            payload: {
                'selectedRow':selectedRow,
                'serverSelectedRow':selectedRow,
                'servereditColumnsOptions':editColumnsOptions,
                'localeditColumnsOptions':localeditColumnsOptions.length ==0?editColumnsOptions:localeditColumnsOptions
            }
        }
    }else{
        let defalutColumnsOptions = [
            {
                Val:"",//枚举值.
                IsStop:0,//1：停用 0：启用.
                IsSys:1,//是否是系统属性.
                IsDeleted:0
            }
        ]        
        return {
            type:ACCOUNT_CUSTOM_SELECTEDROWDATA,
            payload: {
                'selectedRow':selectedRow,
                'serverSelectedRow':selectedRow,
                'servereditColumnsOptions':editColumnsOptions,
                'localeditColumnsOptions':localeditColumnsOptions.length ==0?defalutColumnsOptions:localeditColumnsOptions
            }
        }
    }
}


//点击关闭按钮

export const clickCloseBtn = ()=>{
    return {
        type: ACCOUNT_CUSTOM_SETTINGCLOSE,
        payload: ''
    }
}

//点击取消按钮

export const clickCancleBtn = ()=>{
    return {
        type: ACCOUNT_CUSTOM_SETTINGCANCLE,
        payload: ''
    }
}
//点击应用按钮




export const clickapplyBtn = (applyParam)=> {
    const applyBtn = (type, data)=> {
        return {
            type,
            payload: data
        }
    }



    return (dispatch, getState) => {

        fetch(applyParam.url, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:'req='+JSON.stringify(applyParam.data) 
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function(json) {
            if(json.rs){
                dispatch(applyBtn(ACCOUNT_CUSTOM_APPLY_BTN,applyParam.data))
                message.config({
                  top: 250
                });             
                message.success('应用成功');
            }
        })

    }
}







//切换tab
export const selectedTabIndex = (key)=>{
    return {
        type: ACCOUNT_CUSTOM_CHANGETAB,
        payload: key
    }
}

//更改是否必填

export const changeIsRequired = (changedSatus)=>{
    return {
        type: ACCOUNT_CUSTOM_CHANGEISREQUIRED,
        payload: changedSatus
    }
}


//增加一行编辑项(同步)
export const addItem = (i)=>{
    return {
        type: ACCOUNT_CUSTOM_ADDITEM,
        payload: i
    }
}

//删除一行编辑项
export const deletItem = (i,IsLast)=>{
    return {
        type: ACCOUNT_CUSTOM_DELETEITEM,
        payload: {
            index:i,
            isLast:IsLast
        }
    }
}

export const collectDeletedItem = (deletedItem)=>{
    return {
        type:'ACCOUNT_CUSTOM_COLLECTDELETEITEM',
        payload:deletedItem
    }
}



// 改变输入框的值
export const changeInputValue = (i,textValue)=>{
    return {
        type: ACCOUNT_CUSTOM_CHANGRINPUTVALUE,
        payload: {index:i,value:textValue}
    }
}

// 改变状态启用未启用
export const ChangeStatus = (changedIsWork)=>{
    return {
        type: ACCOUNT_CUSTOM_CHANGEISWORK,
        payload: changedIsWork
    }
}

//后退
export const DownItem = (i)=>{
    return {
        type: ACCOUNT_CUSTOM_DOWNITEM,
        payload: i
    }
}
//后退
export const UpItem = (i)=>{
    return {
        type: ACCOUNT_CUSTOM_UPITEM,
        payload: i
    }
}

export {
	ACCOUNT_CUSTOM_SELECTEDROWDATA,
    ACCOUNT_CUSTOM_SETTINGCLOSE,
    ACCOUNT_CUSTOM_CHANGETAB,
    ACCOUNT_CUSTOM_CHANGEISREQUIRED,
    ACCOUNT_CUSTOM_TABLE_GETDATA,
    ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS,
    ACCOUNT_CUSTOM_ADDITEM,
    ACCOUNT_CUSTOM_DELETEITEM,
    ACCOUNT_CUSTOM_CHANGRINPUTVALUE,
    ACCOUNT_CUSTOM_CHANGEISWORK,
    ACCOUNT_CUSTOM_DOWNITEM,
    ACCOUNT_CUSTOM_UPITEM,
    ACCOUNT_CUSTOM_SETTINGCANCLE,
    ACCOUNT_CUSTOM_APPLY_BTN,
    DATAITEM
}

