/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_QUERY,
    GET_DATALOG_QUERY_SUCCESS
} from 'actions/business/Log/DataLog'

let datalog = {
    loading: false,
    queryColumns: {},
    tableData:{
        "rs": true,
        "data": {
            "total": 128,
            "current": 1,
            "pageSize": 0,
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
            "key": "RelObjectName",
        },
        {
            "title": "字段",
            "dataIndex": "AttributeName",
            "key": "AttributeName",
        },
        {
            "title": "操作时间",
            "dataIndex": "OperateDate",
            "key": "OperateDate",
            "width": 360,
        },
        {
            "title": "操作前内容",
            "dataIndex": "ContentBefore",
            "key": "ContentBefore",
        },
        {
            "title": "操作后内容",
            "dataIndex": "ContentAfter",
            "key": "ContentAfter",
        }
    ]
}

export default function Datalog($$state = Immutable.fromJS(datalog), action) {
    switch(action.type) {
    	case GET_DATALOG_DATA:
    	    return $$state.merge({
                loading: true
            })
    	case GET_DATALOG_SUCCESS:
    	    return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        case GET_DATALOG_QUERY:
            return $$state;
        case GET_DATALOG_QUERY_SUCCESS:
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