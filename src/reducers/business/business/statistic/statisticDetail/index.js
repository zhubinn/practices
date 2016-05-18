/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_STATISTICDETAIL_DATA,
    GET_STATISTICDETAIL_SUCCESS,
    GET_STATISTICDETAIL_FAILURE,
    GET_STATISTICDETAIL_QUERY,
    GET_STATISTICDETAILQUERY_SUCCESS,
} from 'actions/business/business/statistic/statisticDetail'

let statisticDetail = {
    "queryColumns": {
        "DeptName": {
            "searchType": 5,
            "renderData": {
                "defaultValue": ""
            }
        }
    },
    "tableData":{
        "rs": true,
        "data": []
    },
    "tableColumns":[
        {
            "title": "部门名称",
            "width": 150,
            "dataIndex": "DeptName",
            "key": "DeptName",
            render(text, record, index) {
                const  peneUrl = SCRM.url('/scrmweb/business/deptlist?deptID=' + record.ID + '&sub=0');
                if(record.DeptName == '小计' || record.DeptName == '合计'){
                    //return {text};
                    return <span>{text}</span>;
                }else{
                    return <a href={peneUrl}>{text}</a>;
                }
            }
        },
        {
            "title": "用户名称",
            "width": 150,
            "dataIndex": "Name",
            "key": "Name",
            render(text, record, index) {
                const  peneUrl = SCRM.url('/scrmweb/business/list?userID=' + record.ID);
                if(record.classname){
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
            "key": "All"
        },
        {
            "title": "赢单生意数量",
            "width": 150,
            "dataIndex": "Win",
            "key": "Win"
        },
        {
            "title": "输单生意数量",
            "width": 150,
            "dataIndex": "Faild",
            "key": "Faild"
        },
        {
            "title": "进行中生意数量",
            "width": 150,
            "dataIndex": "Load",
            "key": "Load"
        },
        {
            "title": "作废生意数量",
            "width": 150,
            "dataIndex": "ZF",
            "key": "ZF"
        },
        {
            "title": "停滞生意数量",
            "width": 150,
            "dataIndex": "TZ",
            "key": "TZ"
        }
    ]

}

export default function statisticdetail($$state = Immutable.fromJS(statisticDetail), action) {
    switch(action.type) {
        case GET_STATISTICDETAIL_DATA:
            return $$state;
        case GET_STATISTICDETAIL_SUCCESS:
            return $$state.merge({tableData: action.payload.data});
        case GET_STATISTICDETAIL_QUERY:
            return $$state;
        case GET_STATISTICDETAILQUERY_SUCCESS:
            return $$state.merge({queryColumns: action.payload.data});
        default:
            return $$state;
    }
}