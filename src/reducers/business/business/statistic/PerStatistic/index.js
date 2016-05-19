/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_PERSTATISTIC_DATA,
    GET_PERSTATISTIC_SUCCESS,
    GET_PERSTATISTIC_FAILURE,
} from 'actions/business/business/statistic/PerStatistic'

let perStatistic = {
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
            "dataIndex": "All",
            "className": "column-money",
            "key": "All"
        },
        {
            "title": "赢单的生意数量",
            "width": 150,
            "dataIndex": "Win",
            "className": "column-money",
            "key": "Win"
        },
        {
            "title": "输单的生意数量",
            "width": 150,
            "dataIndex": "Faild",
            "className": "column-money",
            "key": "Faild"
        },
        {
            "title": "进行中的生意数量",
            "width": 150,
            "dataIndex": "Load",
            "className": "column-money",
            "key": "Load"
        },
        {
            "title": "作废的生意数量",
            "width": 150,
            "dataIndex": "ZF",
            "className": "column-money",
            "key": "ZF"
        },
        {
            "title": "停滞的生意数量",
            "width": 150,
            "dataIndex": "TZ",
            "className": "column-money",
            "key": "TZ"
        }
    ]

}

export default function PerStatistic($$state = Immutable.fromJS(perStatistic), action) {
    switch(action.type) {
        case GET_PERSTATISTIC_DATA:
            return $$state.merge({
                loading: true
            })
        case GET_PERSTATISTIC_SUCCESS:
            return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        default:
            return $$state;
    }
}