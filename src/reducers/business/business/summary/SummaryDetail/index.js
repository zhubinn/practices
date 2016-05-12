/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_SUMMARYDETAIL_DATA,
    GET_SUMMARYDETAIL_SUCCESS,
    GET_SUMMARYDETAIL_FAILURE,
    GET_SUMMARYDETAIL_QUERY,
    GET_SUMMARYDETAILQUERY_SUCCESS,
} from 'actions/business/business/summary/summaryDetail'

let summaryDetail = {
    "queryColumns": {
        "DeptName": {
            "searchType": 5,
            "renderData": {
                "defaultValue": ""
            }
        },
        "Name": {
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
                const  peneUrl = SCRM.url('/scrmweb/business/deptlist?deptID=' + record.ID);
                if(record.classname){
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

export default function summarydetail($$state = Immutable.fromJS(summaryDetail), action) {
    switch(action.type) {
        case GET_SUMMARYDETAIL_DATA:
            return $$state;
        case GET_SUMMARYDETAIL_SUCCESS:
            return $$state.merge({tableData: action.payload.data});
        case GET_SUMMARYDETAIL_QUERY:
            return $$state;
        case GET_SUMMARYDETAILQUERY_SUCCESS:
            return $$state.merge({queryColumns: action.payload.data});
        default:
            return $$state;
    }
}