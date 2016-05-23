/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_FUNCLOG_DATA,
    GET_FUNCLOG_SUCCESS,
    GET_FUNCLOG_QUERY,
    GET_FUNCLOG_QUERY_SUCCESS,
} from 'actions/business/Log/FunctionLog'

let funclog = {
    loading: false,
    queryColumns:{},
    "tableData":{
        "rs": true,
        "data": {
            "total": 128,
            "current": 1,
            "pageSize": 0,
            "rowData":[]
        }
    },
    "tableColumns":[
        {
            "title": "操作员",
            "dataIndex": "Operator",
            "key": "Operator",
            "width": 150,
        },
        {
            "title": "业务功能",
            "dataIndex": "RelObjectType",
            "key": "RelObjectType",
            "width": 200,
        },
        {
            "title": "操作时间",
            "dataIndex": "OperateDate",
            "key": "OperateDate",
            "width": 380,
        },
        {
            "title": "操作类型",
            "dataIndex": "OperatorType",
            "key": "OperatorType",
            "width": 200,
        }
    ]
}

export default function FuncLog($$state = Immutable.fromJS(funclog), action) {
    switch(action.type) {
        case GET_FUNCLOG_DATA:
            return $$state.merge({
                loading: true
            });
        case GET_FUNCLOG_SUCCESS:
            return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        case GET_FUNCLOG_QUERY:
            return $$state;
        case GET_FUNCLOG_QUERY_SUCCESS:
            return $$state.merge({
                queryColumns: action.payload.data
            });
        case "PAGE_NO_DATA":
            return $$state.merge({
                loading: false
            });
        default:
            return $$state;
    }
}