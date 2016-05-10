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
            width: 150,
            "dataIndex": "deptName",
            "key": "deptName",
            render(text, record, index) {
                const  peneUrl = SCRM.url('/scrmweb/accounts/deptsummarydetail?id=' + record.OperatorType);
                if(record.classname){
                    //return {text};
                    return <span>{text}</span>;
                }else{
                    return <a href={peneUrl}>{text}</a>;
                }
            }
        },
        {
            "title": "全部生意",
            width: 150,
            "dataIndex": "allBusiness",
            "key": "allBusiness"
        },
        {
            "title": "赢单生意",
            width: 150,
            "dataIndex": "winBusiness",
            "key": "winBusiness"
        },
        {
            "title": "输单生意",
            width: 150,
            "dataIndex": "failureBusiness",
            "key": "failureBusiness"
        },
        {
            "title": "进行中生意",
            width: 150,
            "dataIndex": "doingBusiness",
            "key": "doingBusiness"
        },
        {
            "title": "作废生意",
            width: 150,
            "dataIndex": "cancelBusiness",
            "key": "cancelBusiness"
        },
        {
            "title": "停滞生意",
            width: 150,
            "dataIndex": "stopBusiness",
            "key": "stopBusiness"
        },
        {
            "title": "重要生意",
            width: 150,
            "dataIndex": "importantBusiness",
            "key": "importantBusiness"
        }
    ]

}

export default function deptsummary($$state = Immutable.fromJS(deptSummary), action) {
    switch(action.type) {
        case GET_DEPTSUMMARY_DATA:
            return $$state;
        case GET_DEPTSUMMARY_SUCCESS:
            return $$state.mergeDeep({tableData: action.payload.data});
        default:
            return $$state;
    }
}