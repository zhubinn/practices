/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_DEPTSTATISTIC_DATA,
    GET_DEPTSTATISTIC_SUCCESS,
    GET_DEPTSTATISTIC_FAILURE,
} from 'actions/business/business/statistic/deptstatistic'

let deptStatistic = {
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
            "title": "部门名称",
            width: 150,
            "dataIndex": "deptName",
            "key": "deptName"
        },
        {
            "title": "全部生意",
            width: 150,
            "dataIndex": "allBusiness",
            "key": "allBusiness"
        },
        {
            "title": "赢单生意",
            width: 150,
            "dataIndex": "winBusiness",
            "key": "winBusiness"
        },
        {
            "title": "输单生意",
            width: 150,
            "dataIndex": "failureBusiness",
            "key": "failureBusiness"
        },
        {
            "title": "进行中生意",
            width: 150,
            "dataIndex": "doingBusiness",
            "key": "doingBusiness"
        },
        {
            "title": "作废生意",
            width: 150,
            "dataIndex": "cancelBusiness",
            "key": "cancelBusiness"
        },
        {
            "title": "停滞生意",
            width: 150,
            "dataIndex": "stopBusiness",
            "key": "stopBusiness"
        },
        {
            "title": "重要生意",
            width: 150,
            "dataIndex": "importantBusiness",
            "key": "importantBusiness"
        }
    ]

}

export default function deptstatistic($$state = Immutable.fromJS(deptStatistic), action) {
    switch(action.type) {
        case GET_DEPTSTATISTIC_DATA:
            return $$state;
        case GET_DEPTSTATISTIC_SUCCESS:
            return $$state.mergeDeep({tableData: action.payload.data});
        default:
            return $$state;
    }
}