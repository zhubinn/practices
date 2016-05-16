/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_PERSUMMARY_DATA,
    GET_PERSUMMARY_SUCCESS,
    GET_PERSUMMARY_FAILURE,
} from 'actions/business/business/summary/PerSummary'

let perSummary = {
    "tableData":{
        "rs": true,
        "data": []
    },
    "tableColumns":[
        {
            "title": "用户名称",
            "width": 150,
            "dataIndex": "Name",
            "key": "Name"
        },
        {
            "title": "全部生意数量",
            "width": 150,
            "dataIndex": "Business",
            "key": "Business"
        },
        {
            "title": "全部预计金额",
            "width": 150,
            "dataIndex": "AmountPlan",
            "key": "AmountPlan"
        },
        {
            "title": "全部成交金额",
            "width": 150,
            "dataIndex": "Amount",
            "key": "Amount"
        },
        {
            "title": "全部回款金额",
            "width": 150,
            "dataIndex": "Payment",
            "key": "Payment"
        },
        {
            "title": "全部输单金额",
            "width": 150,
            "dataIndex": "Failed",
            "key": "Failed"
        }
    ]

}

export default function deptstatistic($$state = Immutable.fromJS(perSummary), action) {
    switch(action.type) {
        case GET_PERSUMMARY_DATA:
            return $$state;
        case GET_PERSUMMARY_SUCCESS:
            return $$state.merge({tableData: action.payload.data});
        default:
            return $$state;
    }
}