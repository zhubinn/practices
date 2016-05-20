/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import getQueryString from 'components/Business/GetQueryString'
import { 
    GET_STATISTICDETAIL_DATA,
    GET_STATISTICDETAIL_SUCCESS,
    GET_STATISTICDETAIL_FAILURE,
    GET_STATISTICDETAIL_QUERY,
    GET_STATISTICDETAILQUERY_SUCCESS,
} from 'actions/business/business/statistic/statisticDetail'

let deptID = getQueryString("deptID")

let statisticDetail = {
    "loading": false,
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
                const  peneUrl = SCRM.url('/scrmweb/business/deptlist?deptID=' + deptID + '&sub=0');
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
            "className": "column-money",
            "key": "All"
        },
        {
            "title": "赢单生意数量",
            "width": 150,
            "dataIndex": "Win",
            "className": "column-money",
            "key": "Win"
        },
        {
            "title": "输单生意数量",
            "width": 150,
            "dataIndex": "Faild",
            "className": "column-money",
            "key": "Faild"
        },
        {
            "title": "进行中生意数量",
            "width": 150,
            "dataIndex": "Load",
            "className": "column-money",
            "key": "Load"
        },
        {
            "title": "作废生意数量",
            "width": 150,
            "dataIndex": "ZF",
            "className": "column-money",
            "key": "ZF"
        },
        {
            "title": "停滞生意数量",
            "width": 150,
            "dataIndex": "TZ",
            "className": "column-money",
            "key": "TZ"
        }
    ]
}

export default function statisticdetail($$state = Immutable.fromJS(statisticDetail), action) {
    switch(action.type) {
        case GET_STATISTICDETAIL_DATA:
            return $$state.merge({
                loading: true
            });
        case GET_STATISTICDETAIL_SUCCESS:
            return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        default:
            return $$state;
    }
}