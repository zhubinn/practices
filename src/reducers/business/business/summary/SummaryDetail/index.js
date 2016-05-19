/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import getQueryString from 'components/Business/GetQueryString'
import { 
    GET_SUMMARYDETAIL_DATA,
    GET_SUMMARYDETAIL_SUCCESS,
    GET_SUMMARYDETAIL_FAILURE,
} from 'actions/business/business/summary/summaryDetail'

let deptID = getQueryString("deptID")

let summaryDetail = {
    "loading": false,
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
            "dataIndex": "Business",
            "className": "column-money",
            "key": "Business"
        },
        {
            "title": "全部预计金额",
            "width": 150,
            "dataIndex": "AmountPlan",
            "className": "column-money",
            "key": "AmountPlan"render(text, record, index) {
                    return <span>{"￥"+ text}</span>;
            }
        },
        {
            "title": "全部成交金额",
            "width": 150,
            "dataIndex": "Amount",
            "className": "column-money",
            "key": "Amount"render(text, record, index) {
                    return <span>{"￥"+ text}</span>;
            }
        },
        {
            "title": "全部回款金额",
            "width": 150,
            "dataIndex": "Payment",
            "className": "column-money",
            "key": "Payment"render(text, record, index) {
                    return <span>{"￥"+ text}</span>;
            }
        },
        {
            "title": "全部输单金额",
            "width": 150,
            "dataIndex": "Failed",
            "className": "column-money",
            "key": "Failed"render(text, record, index) {
                    return <span>{"￥"+ text}</span>;
            }
        }
    ]

}

export default function summarydetail($$state = Immutable.fromJS(summaryDetail), action) {
    switch(action.type) {
        case GET_SUMMARYDETAIL_DATA:
            return $$state.merge({
                loading: true
            })
        case GET_SUMMARYDETAIL_SUCCESS:
            return $$state.merge({
                tableData: action.payload.data,
                loading: false
            });
        default:
            return $$state;
    }
}