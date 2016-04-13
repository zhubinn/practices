import { FETCH_DATA,CLICK_PREV_BUTTON, CLICK_NEXT_BUTTON, IMPORT_BUTTON } from '../../constants/numberReportViewTypes'
import Immutable from 'immutable'

const $$initialState = {
    responseJson:[]
}
    //npType:'day',
    //day:'2016-5-4',
    //month:'2016-5',
    //week:'2016.5.1 —— 2016.5.7',
    //responseJson:[
    //    {
    //        id: 0,
    //        department: '全体部门',
    //        reportName: '梁玉洁',
    //        reportItem: '今日入库',
    //        num:8
    //    },
    //    {
    //        id: 0,
    //        department: '全体部门',
    //        reportName: '梁玉洁',
    //        reportItem: '今日入库',
    //        num:8
    //    },
    //    {
    //        id: 0,
    //        department: '全体部门',
    //        reportName: '梁玉洁',
    //        reportItem: '今日入库',
    //        num:8
    //    },
    //    {
    //        id: 0,
    //        department: '全体部门',
    //        reportName: '梁玉洁',
    //        reportItem: '今日入库',
    //        num:8
    //    },
    //    {
    //        id: 0,
    //        department: '全体部门',
    //        reportName: '梁玉洁',
    //        reportItem: '今日入库',
    //        num:8
    //    },
    //]


export default function numberReportViewState($$state = Immutable.fromJS($$initialState), action) {

    switch (action.type) {
        case FETCH_DATA:
            console.log($$state);
            return $$state.merge(action.data);
        case CLICK_PREV_BUTTON:
            //可以直接使用返回過來的data
            //return $$state.merge(action.data);
            console.log($$state);
            return $$state.merge({
                day: action.curInputValue,
                reponesJson: action.data.reponesJson
            });
        case CLICK_NEXT_BUTTON:
            console.log(action.data.responseJson);



            return $$state.updateIn(["reponesJson"],function(reponesJson){
                console.log('=====',reponesJson)
            })

        case IMPORT_BUTTON:
            state.splice(action.id,1);
            return [...$$state];

        default:
            return $$state
    }
}
