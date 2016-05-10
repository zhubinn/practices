/**
 * Created by ytm on 4/17/16.
 */
import Immutable from 'immutable'
import { 
    GET_SUMMARYDETAIL_DATA,
    GET_SUMMARYDETAIL_SUCCESS,
    GET_SUMMARYDETAIL_FAILURE,
} from 'actions/business/business/summary/summaryDetail'

let summaryDetail = {
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
                const  peneUrl = SCRM.url('/scrmweb/business/getDeptSummaryDetail?params={"ID":' + record.ID + '}');
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

export default function summarydetail($$state = Immutable.fromJS(summaryDetail), action) {
    switch(action.type) {
        case GET_SUMMARYDETAIL_DATA:
            return $$state;
        case GET_SUMMARYDETAIL_SUCCESS:
            return $$state.mergeDeep({tableData: action.payload.data});
        default:
            return $$state;
    }
}