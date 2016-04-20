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

        //const url = 'http://esn.chenhuangfang.com/scrmnumreport/index/tpllist/VISITID/1?filterscount=0&groupscount=0&pagenum=1&pagesize=20&recordstartindex=0&recordendindex=13&_=1458806730117'
        const url = '/actions/_demo/list.json';
        const rowData = {
        rows: [
        {col_name:'客户级别',col_type:'单选类型',col_IsRequired:'是',col_Remark:'用户自定义',id:1},
        {col_name:'所属区域',col_type:'单选类型',col_IsRequired:'否',col_Remark:'用户自定义',id:2},
        {col_name:'客户来源',col_type:'单选类型',col_IsRequired:'是',col_Remark:'用户自定义',id:3},
        {col_name:'行业分类',col_type:'单选类型',col_IsRequired:'是',col_Remark:'用户自定义',id:4}
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

    
export const selectedRowData = ({'selectedRow':selectedRow})=>{
    //此处需要请求到每个自定义字段的编辑项信息，此处用假数据代替
    const _selectedRowData = (type, data)=> {

        return {
            type,
            payload: data
        }
    }
/*
**初始默认进入页面室时会从后台带过来用户所选择的字段的设置的编辑项只有一条数据
如果后台返回的是空的，说明用户没有设置过，那前端给一个默认的数据如下,并且不可删除
*/
    const editColumnsOptions = [
    {optionInfor:'',IsDelete:'否',status:'启用'}
]

/*
**
如果后台返回的是不为空，说明用户已经设置过，那前端就直接展示该数据,并且用户是可以删除的
*/



    //selectedRow.editColumnsOptions = editColumnsOptions;
    
    return (dispatch, getState) => {
        dispatch(_selectedRowData(ACCOUNT_CUSTOM_SELECTEDROWDATA,{'selectedRow':selectedRow,'editColumnsOptions':editColumnsOptions}))
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
export const deletItem = (i)=>{
    return {
        type: ACCOUNT_CUSTOM_DELETEITEM,
        payload: i
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

