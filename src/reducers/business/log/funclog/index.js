/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    FUNCLOG_SIZE_CHANGE,
    GET_FUNCLOG_DATA,
    GET_FUNCLOG_SUCCESS,
    GET_FUNCLOG_FAILURE,
    EXPORT_FUNCLOG_SHOW,
    EXPORT_FUNCLOG_HIDE,
    GET_FUNCLOG_QUERY,
    GET_FUNCLOG_QUERY_SUCCESS
} from 'actions/business/Log/FunctionLog'

let funclog = {
    queryColumns:{
        "Operator": {
            "searchType": 18,
            "renderData": {
                "defaultValue": ""
            }
        },
        "RelObjectType": {
            "searchType": 12,
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
        "OperatorType": {
            "searchType": 12,
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
    "tableData":{
        "rs": true,
        "data": {
            "total": 128,
            "current": 1,
            "pageSize": 10,
            "rowData":[]
        }
    },
    "tableColumns":[
        {
            "title": "操作员",
            "dataIndex": "Operator",
            "key": "Operator"
        },
        {
            "title": "业务功能",
            "dataIndex": "RelObjectType",
            "key": "RelObjectType"
        },
        {
            "title": "操作类型",
            "dataIndex": "OperatorType",
            "key": "OperatorType"
        },
        {
            "title": "操作时间",
            "dataIndex": "OperateDate",
            "key": "OperateDate"
        }
    ]
}

export default function FuncLog($$state = Immutable.fromJS(funclog), action) {
    switch(action.type) {
        case FUNCLOG_SIZE_CHANGE:
            return $$state.merge({tableData: action.payload.data});
        case GET_FUNCLOG_DATA:
            return $$state;
        case GET_FUNCLOG_SUCCESS:
            return $$state.merge({tableData: action.payload.data});
        case GET_FUNCLOG_QUERY:
            return $$state;
        case GET_FUNCLOG_QUERY_SUCCESS:
            return $$state.merge({queryColumns: action.payload.data});
        case EXPORT_FUNCLOG_SHOW:
            return $$state.merge({export: {"visible": true}});
        case "EXPORT_FUNCLOG_HIDE":
            return $$state.merge({export: {"visible": false}});
        default:
            return $$state;
    }
}