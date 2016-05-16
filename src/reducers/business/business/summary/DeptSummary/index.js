/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_DEPTSUMMARY_DATA,
    GET_DEPTSUMMARY_SUCCESS,
    GET_DEPTSUMMARY_FAILURE,
} from 'actions/business/business/summary/DeptSummary'

let deptSummary = {
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
                const  peneUrl = SCRM.url('/scrmweb/business/deptsummarydetail?deptID=' + record.ID + '&deptName=' + escape(record.Name).replace(/%u/gi, '\\u'));
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

export default function deptsummary($$state = Immutable.fromJS(deptSummary), action) {
    switch(action.type) {
        case GET_DEPTSUMMARY_DATA:
            return $$state;
        case GET_DEPTSUMMARY_SUCCESS:
            return $$state.merge({tableData: action.payload.data});
        default:
            return $$state;
    }
}