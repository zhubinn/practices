/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    FUNCLOG_SIZE_CHANGE,
    GET_FUNCLOG_DATA,
    GET_FUNCLOG_SUCCESS,
    GET_FUNCLOG_FAILURE,
} from 'actions/business/Log/FunctionLog'

let funclog = {
    "tableData":{
        "rs": true,
        "data": {
            "Total": 128,
            "Pages": 13,
            "CurrentPage": 10,
            "PageRow": 10,
            "Data":[]
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
            return $$state.mergeDeep({tableData: action.payload.data});
        case GET_FUNCLOG_DATA:
            return $$state;
        case GET_FUNCLOG_SUCCESS:
            return $$state.mergeDeep({tableData: action.payload.data});
        default:
            return $$state;
    }
}