import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

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
const ACCOUNT_CUSTOM_SETTINGAPPLY = 'ACCOUNT_CUSTOM_SETTINGAPPLY'

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
 export const getTableData = () => {
    const _getTableData = (type, data)=> {
        return {
            type,
            payload: data
        }
    }

    return (dispatch, getState) => {

        const url = 'http://esn.xuyajun.com/scrmdefined/account/getAccountEnumAttrList/VISITID/1';
        const rowData = {
        rows: [
        {Label:'客户级别',AttrType:'单选类型',IsMast:'是',Content:'用户自定义',ID:1,
        Enums:[
                {
                    Val:"值值值值值值",//枚举值.
                    IsStop:1,//停用启用.
                    IsSys:0,//是否是系统属性.
                },
                {
                    Val:"凤飞飞凤飞飞凤飞飞",//枚举值.
                    IsStop:0,//停用启用.
                    IsSys:0,//是否是系统属性.
                },
                {
                    Val:"大苏打大苏打大苏打",//枚举值.
                    IsStop:0,//停用启用.
                    IsSys:1,//是否是系统属性.
                }
            ]
        },
        {Label:'所属区域',AttrType:'单选类型',IsMast:'否',Content:'用户自定义',ID:2,
        Enums:[]
        },
        {Label:'客户来源',AttrType:'单选类型',IsMast:'是',Content:'用户自定义',ID:3,
        Enums:[]
        },
        {Label:'行业分类',AttrType:'单选类型',IsMast:'是',Content:'用户自定义',ID:4,
        Enums:[]
        }
        ]
    };

        dispatch(_getTableData(ACCOUNT_CUSTOM_TABLE_GETDATA));
        dispatch(_getTableData(ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS, rowData))

        // return fetch(url, {
        //     method: 'get',
        //     headers: {
        //         'API': 1,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response=> {
        //     //dispatch(_getPeopleData(ACCOUNT_CUSTOM_SEARCH_GETDATA_SUCCESS, peopleListData))
        //     if (response.status >= 400) {
        //         //dispatch(_getReportData(ACCOUNT_CUSTOM_REPORT_GETDATA_ERROR_NETWORK))
        //         return {};
        //     }
        //     return response.json()
        // }).then(json=> {
        //     json = rowData;//假数据
        //     //console.log(json);
        //     // if (json.rs) {
        //     //     dispatch(_getPeopleData(ACCOUNT_CUSTOM_SEARCH_GETDATA_SUCCESS, json.data))
        //     // } else {
        //     //     dispatch(_getPeopleData(ACCOUNT_CUSTOM_SEARCH_GETDATA_FAILURE))
        //     // }
        //     dispatch(_getTableData(ACCOUNT_CUSTOM_TABLE_GETDATA_SUCCESS, json))
        // })
    }
}


export const selectedRowData = (selectedRow,editColumnsOptions)=>{
    if(editColumnsOptions.length == 0){
        let editColumnsOptions = [
            {
                Val:"",//枚举值.
                IsStop:0,//1：停用 0：启用.
                IsSys:1,//是否是系统属性.
            }
        ]
        return {
            type:ACCOUNT_CUSTOM_SELECTEDROWDATA,
            payload: {
                'selectedRow':selectedRow,
                'editColumnsOptions':editColumnsOptions
            }
        }
    }else{
        return {
            type:ACCOUNT_CUSTOM_SELECTEDROWDATA,
            payload: {
                'selectedRow':selectedRow,
                'editColumnsOptions':editColumnsOptions
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


export const clickapplyBtn = (editColumnsOptions)=> {
    const login = (type, data)=> {
        return {
            type,
            payload: data
        }
    }
    //模拟请求

    return (dispatch, getState) => {
        fetch('/actions/_demo/list.json', {
            method: 'post',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                editColumnsOptions,
            })
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
            return response.json()
        }).then(function(json) {
            dispatch(login(ACCOUNT_CUSTOM_APPLY_BTN))
        })

    }
}







//切换tab
export const selectedTabIndex = ({'currentTabIndex':i})=>{
    return {
        type: ACCOUNT_CUSTOM_CHANGETAB,
        payload: {'currentTabIndex':i}
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
    ACCOUNT_CUSTOM_SETTINGAPPLY,
    ACCOUNT_CUSTOM_DOWNITEM,
    ACCOUNT_CUSTOM_UPITEM,
    ACCOUNT_CUSTOM_SETTINGCANCLE,
    DATAITEM
}

