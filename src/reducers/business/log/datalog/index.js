/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    DATALOG_SIZE_CHANGE,
    GET_DATALOG_DATA,
    GET_DATALOG_SUCCESS,
    GET_DATALOG_FAILURE,
} from 'actions/business/Log/DataLog'

let datalog = {
    "tableData":{
        "rs": true,
        "data": {
            "total": 128,
            "current": 10,
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
            "title": "操作类型",
            "dataIndex": "OperatorType",
            "key": "OperatorType"
        },
        {
            "title": "业务功能",
            "dataIndex": "RelObjectType",
            "key": "RelObjectType"
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
            "key": "OperateDate"
        }
    ]

}

export default function Datalog($$state = Immutable.fromJS(datalog), action) {
    switch(action.type) {
        case DATALOG_SIZE_CHANGE:
            return $$state.mergeDeep({tableData: action.payload.data});
    	case GET_DATALOG_DATA:
    	    return $$state;
    	case GET_DATALOG_SUCCESS:
    	    return $$state.mergeDeep({tableData: action.payload.data});
        default:
            return $$state;
    }
}