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
    "loading": false,
    "tableData":{
        "rs": true,
        "data": []
    },
    "tableColumns":[
        {
            "title": "部门名称",
            "width": 150,
            "dataIndex": "Name",
            "key": "Name",
            render(text, record, index) {
                const  peneUrl = SCRM.url('/scrmweb/business/deptstatisticdetail?deptID=' + record.ID + '&deptName=' + escape(record.Name).replace(/%u/gi, '\\u'));
                if(record.Name == '小计' || record.Name == '合计'){
                    //return {text};
                    return <span>{text}</span>;
                }else{
                    return <a href={peneUrl}>{text}</a>;
                }
            }
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

export default function deptstatistic($$state = Immutable.fromJS(deptStatistic), action) {
    switch(action.type) {
        case GET_DEPTSTATISTIC_DATA:
            return $$state.merge({
                loading: true
            })
        case GET_DEPTSTATISTIC_SUCCESS:
            return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        default:
            return $$state;
    }
}