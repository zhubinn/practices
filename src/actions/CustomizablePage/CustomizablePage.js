import fetch from 'isomorphic-fetch'
import { routerMiddleware, push } from 'react-router-redux'

// 选择某一个字段编辑
const CK_SELECTEDROWDATA = 'CK_SELECTEDROWDATA'

//关闭模态层
const CK_SETTINGCLOSE = 'CK_SETTINGCLOSE'

//切换tab
const CK_CHANGETAB = 'CK_CHANGETAB'

//改变是否必填
const CK_CHANGEISREQUIRED = 'CK_CHANGEISREQUIRED'

//获取自定义字段列表数据
const CK_TABLE_GETDATA ='CK_TABLE_GETDATA'
const CK_TABLE_GETDATA_SUCCESS = 'CK_TABLE_GETDATA_SUCCESS'

//增加一行编辑项
const CK_ADDITEM = 'CK_ADDITEM'

//删除一行编辑项
const CK_DELETEITEM = 'CK_DELETEITEM'

//改变输入框值
const CK_CHANGRINPUTVALUE = 'CK_CHANGRINPUTVALUE'

//改变启用未启用状态
const CK_CHANGEISWORK = 'CK_CHANGEISWORK'
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

        dispatch(_getTableData(CK_TABLE_GETDATA));

        return fetch(url, {
            method: 'get',
            headers: {
                'API': 1,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            //dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, peopleListData))
            if (response.status >= 400) {
                //dispatch(_getReportData(CK_REPORT_GETDATA_ERROR_NETWORK))
                return {};
            }
            return response.json()
        }).then(json=> {
            json = rowData;//假数据
            //console.log(json);
            // if (json.rs) {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_SUCCESS, json.data))
            // } else {
            //     dispatch(_getPeopleData(CK_SEARCH_GETDATA_FAILURE))
            // }
            dispatch(_getTableData(CK_TABLE_GETDATA_SUCCESS, json))
        })
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

    const editColumnsOptions = [
    {optionInfor:'村级代理商',IsDelete:'否',status:'启用'},
    {optionInfor:'县级代理商',IsDelete:'是',status:'启用'},
    {optionInfor:'省级代理商',IsDelete:'是',status:'未启用'},
    {optionInfor:'一级代理商',IsDelete:'是',status:'启用'},
    {optionInfor:'二级代理商',IsDelete:'是',status:'启用'},
    {optionInfor:'',IsDelete:'是',status:'启用'}
]

    //selectedRow.editColumnsOptions = editColumnsOptions;
    
    return (dispatch, getState) => {
        dispatch(_selectedRowData(CK_SELECTEDROWDATA,{'selectedRow':selectedRow,'editColumnsOptions':editColumnsOptions}))
    }

}

//点击关闭按钮

export const clickCloseBtn = ()=>{
    return {
        type: CK_SETTINGCLOSE,
        payload: ''
    }
}


//切换tab
export const selectedTabIndex = ({'currentTabIndex':i})=>{
    return {
        type: CK_CHANGETAB,
        payload: {'currentTabIndex':i}
    }
}

//更改是否必填

export const changeIsRequired = (changedSatus)=>{
    return {
        type: CK_CHANGEISREQUIRED,
        payload: changedSatus
    }
}


//增加一行编辑项(同步)
export const addItem = (i)=>{
    return {
        type: CK_ADDITEM,
        payload: i
    }
}

//删除一行编辑项
export const deletItem = (i)=>{
    return {
        type: CK_DELETEITEM,
        payload: i
    }
}

// 改变输入框的值
export const changeInputValue = (i,textValue)=>{
    return {
        type: CK_CHANGRINPUTVALUE,
        payload: {index:i,value:textValue}
    }
}

// 改变状态启用未启用
export const ChangeStatus = (changedIsWork)=>{
    return {
        type: CK_CHANGEISWORK,
        payload: changedIsWork
    }
}

export {
	CK_SELECTEDROWDATA,
    CK_SETTINGCLOSE,
    CK_CHANGETAB,
    CK_CHANGEISREQUIRED,
    CK_TABLE_GETDATA,
    CK_TABLE_GETDATA_SUCCESS,
    CK_ADDITEM,
    CK_DELETEITEM,
    CK_CHANGRINPUTVALUE,
    CK_CHANGEISWORK,
    getTableData,
	selectedRowData,
    clickCloseBtn,
    selectedTabIndex,
    changeIsRequired,
    addItem,
    deletItem,
}

