/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    DATALOG_SIZE_CHANGE,
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_FAILURE,
    EXPORT_DATALOG_SHOW,
    EXPORT_DATALOG_HIDE,
    GET_DATALOG_QUERY,
    GET_DATALOG_QUERY_SUCCESS
} from 'actions/business/Log/DataLog'

let datalog = {
    queryColumns: {
        "Operator": {
            "searchType": 5,
            "renderData": {
                "defaultValue": ""
            }
        },
        "OperatorType": {
            "searchType": 13,
            "renderData": {
                "defaultValue": "",
                "options": [
                    {
                        "text": "新增",
                        "value": 1
                    },
                    {
                        "text": "修改",
                        "value": 2
                    },
                    {
                        "text": "删除",
                        "value": 3
                    },
                    {
                        "text": "启用",
                        "value": 4
                    },
                    {
                        "text": "停用",
                        "value": 5
                    },
                    {
                        "text": "重启",
                        "value": 6
                    },
                    {
                        "text": "重置",
                        "value": 7
                    },
                    {
                        "text": "恢复",
                        "value": 8
                    },
                    {
                        "text": "作废",
                        "value": 9
                    },
                    {
                        "text": "取消发布",
                        "value": 10
                    },
                    {
                        "text": "复制",
                        "value": 11
                    },
                    {
                        "text": "设置",
                        "value": 12
                    },
                    {
                        "text": "下载",
                        "value": 13
                    },
                    {
                        "text": "停滞",
                        "value": 14
                    }
                ]
            }
        },
        "RelObjectType": {
            "searchType": 13,
            "renderData": {
                "defaultValue": "",
                "options": [
                    {
                        "text": "客户",
                        "value": 1
                    },
                    {
                        "text": "联系人",
                        "value": 2
                    },
                    {
                        "text": "线索",
                        "value": 3
                    },
                    {
                        "text": "生意",
                        "value": 4
                    },
                    {
                        "text": "考勤",
                        "value": 213
                    },
                    {
                        "text": "预测",
                        "value": 301
                    },
                    {
                        "text": "报数",
                        "value": 220
                    },
                    {
                        "text": "销售阶段自定义",
                        "value": 402
                    },
                    {
                        "text": "客户生命周期自定义",
                        "value": 403
                    },
                    {
                        "text": "目标",
                        "value": 54
                    }
                ]
            }
        },
        "RelObjectName": {
            "searchType": 5,
            "renderData": {
                "defaultValue": ""
            }
        },
        "AttributeName": {
            "searchType": 5,
            "renderData": {
                "defaultValue": ""
            }
        },
        "OperateDate": {
            "searchType": 16,
            "renderData": {
                "defaultValue": [
                    "",
                    ""
                ]
            }
        }
    },
    export:{
        "visible": false
    },
    tableData:{
        "rs": true,
        "data": {
            "total": 128,
            "current": 10,
            "pageSize": 10,
            "rowData":[]
        }
    },
    tableColumns:[
        {
            "title": "操作员",
            "dataIndex": "Operator",
            "key": "Operator",
            "width": 100,
        },
        {
            "title": "操作类型",
            "dataIndex": "OperatorType",
            "key": "OperatorType",
            "width": 100,
        },
        {
            "title": "业务功能",
            "dataIndex": "RelObjectType",
            "key": "RelObjectType",
            "width": 100,
        },
        {
            "title": "业务对象",
            "dataIndex": "RelObjectName",
            "key": "RelObjectName"
        },
        {
            "title": "字段",
            "dataIndex": "AttributeName",
            "key": "AttributeName"
        },
        {
            "title": "操作前内容",
            "dataIndex": "ContentBefore",
            "key": "ContentBefore"
        },
        {
            "title": "操作后内容",
            "dataIndex": "ContentAfter",
            "key": "ContentAfter"
        },
        {
            "title": "操作时间",
            "dataIndex": "OperateDate",
            "key": "OperateDate",
            "width": 350
        }
    ]
}

export default function Datalog($$state = Immutable.fromJS(datalog), action) {
    switch(action.type) {
        case DATALOG_SIZE_CHANGE:
            return $$state.merge({tableData: action.payload.data});
    	case GET_DATALOG_DATA:
    	    return $$state;
    	case GET_DATALOG_SUCCESS:
    	    return $$state.merge({tableData: action.payload.data});
        case GET_DATALOG_QUERY:
            return $$state;
        case GET_DATALOG_QUERY_SUCCESS:
            return $$state.merge({queryColumns: action.payload.data});
        case EXPORT_DATALOG_SHOW:
            return $$state.merge({export: {"visible": true}});
        case EXPORT_DATALOG_HIDE:
            return $$state.merge({export: {"visible": false}});
        default:
            return $$state;
    }
}