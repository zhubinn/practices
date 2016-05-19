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
    "loading": false,
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
            "className": "column-money",
            "key": "Business"
        },
        {
            "title": "全部预计金额",
            "width": 150,
            "dataIndex": "AmountPlan",
            "className": "column-money",
            "key": "AmountPlan"
        },
        {
            "title": "全部成交金额",
            "width": 150,
            "dataIndex": "Amount",
            "className": "column-money",
            "key": "Amount"
        },
        {
            "title": "全部回款金额",
            "width": 150,
            "dataIndex": "Payment",
            "className": "column-money",
            "key": "Payment"
        },
        {
            "title": "全部输单金额",
            "width": 150,
            "dataIndex": "Failed",
            "className": "column-money",
            "key": "Failed"
        }
    ]

}

export default function deptstatistic($$state = Immutable.fromJS(perSummary), action) {
    switch(action.type) {
        case GET_PERSUMMARY_DATA:
            return $$state.merge({
                loading: true
            })
        case GET_PERSUMMARY_SUCCESS:
            return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        default:
            return $$state;
    }
}