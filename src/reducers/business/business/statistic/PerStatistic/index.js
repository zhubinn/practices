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
    "tableData":{
        "rs": true,
        "data": []
    },
    "tableColumns":[
        {
            "title": "部门名称",
            "width": 150,
            "dataIndex": "Name",
            "key": "Name"
        },
        {
            "title": "全部生意数量",
            "width": 150,
            "dataIndex": "All",
            "key": "All"
        },
        {
            "title": "赢单的生意数量",
            "width": 150,
            "dataIndex": "Win",
            "key": "Win"
        },
        {
            "title": "输单的生意数量",
            "width": 150,
            "dataIndex": "Faild",
            "key": "Faild"
        },
        {
            "title": "进行中的生意数量",
            "width": 150,
            "dataIndex": "Load",
            "key": "Load"
        },
        {
            "title": "作废的生意数量",
            "width": 150,
            "dataIndex": "ZF",
            "key": "ZF"
        },
        {
            "title": "停滞的生意数量",
            "width": 150,
            "dataIndex": "TZ",
            "key": "TZ"
        }
    ]

}

export default function PerStatistic($$state = Immutable.fromJS(perStatistic), action) {
    switch(action.type) {
        case GET_PERSTATISTIC_DATA:
            return $$state;
        case GET_PERSTATISTIC_SUCCESS:
            return $$state.mergeDeep({tableData: action.payload.data});
        default:
            return $$state;
    }
}