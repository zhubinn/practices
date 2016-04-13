import { CLICK_PREV_BUTTON, CLICK_NEXT_BUTTON, IMPORT_BUTTON } from '../../constants/numberReportViewTypes'

const initialState = {
    npType:'day',
    day:'2016-5-4',
    month:'2016-5',
    week:'2016.5.1 —— 2016.5.7',
    responseJson:[
        {
            id: 0,
            department: '全体部门',
            reportName: '梁玉洁',
            reportItem: '今日入库',
            num:8
        },
        {
            id: 0,
            department: '全体部门',
            reportName: '梁玉洁',
            reportItem: '今日入库',
            num:8
        },
        {
            id: 0,
            department: '全体部门',
            reportName: '梁玉洁',
            reportItem: '今日入库',
            num:8
        },
        {
            id: 0,
            department: '全体部门',
            reportName: '梁玉洁',
            reportItem: '今日入库',
            num:8
        },
        {
            id: 0,
            department: '全体部门',
            reportName: '梁玉洁',
            reportItem: '今日入库',
            num:8
        },
    ]
}

export default function numberReportViewState(state = initialState, action) {

    switch (action.type) {
        case CLICK_PREV_BUTTON:
            state[action.id].text = action.text;
            return [...state];
        case CLICK_NEXT_BUTTON:
            return [
                ...state,
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    status: false,
                    text: action.text
                }
            ]

        case IMPORT_BUTTON:
            state.splice(action.id,1);
            return [...state];

        default:
            return state
    }
}
