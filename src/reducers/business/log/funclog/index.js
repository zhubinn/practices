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
    },
    export:{
        "visible": false
    },
    "tableData":{
        "rs": true,
        "data": {
            "total": 128,
            "current": 1,
            "pageSize": 20,
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
            "key": "OperateDate",
            "width": 360
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