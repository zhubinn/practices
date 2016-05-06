/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import {
    CK_COMPONENT_QUERYNESTEDTABLE_INIT,
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATECHILD,
    CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL,
    CK_COMPONENT_QUERYTABLE_CHANGE,
} from 'actions/components/QueryNestedTable'

const EMPTY_ARRAY = []
const EMPTY_OBJECT = {}

const $$initialState = Immutable.fromJS({
    columns: EMPTY_ARRAY,
    dataSource: EMPTY_ARRAY,
    loading: true,
    showSearchTable: true,
    childProps: {
        columns: EMPTY_ARRAY,
        dataSource: EMPTY_OBJECT,
        loading: EMPTY_OBJECT,
        showSearchTable: EMPTY_OBJECT,
    },
    queryParams: EMPTY_OBJECT,
    childQueryParams: EMPTY_OBJECT,
    finalQueryParams: EMPTY_OBJECT,
    finalChildQueryParams: EMPTY_OBJECT,
    pagination: {
        current: 1,
        defaultCurrent: 1,
        total: 0,
        defaultPageSize: 20,
        pageSize: 20,
        showSizeChanger: false,
        pageSizeOptions: ['10', '20', '30', '40'],
        showQuickJumper: false,
    },
})

const report = ($$state = $$initialState, action) => {
    switch (action.type) {
        case CK_COMPONENT_QUERYNESTEDTABLE_INIT:
            return $$state.mergeDeep(action.payload)

        case CK_COMPONENT_QUERYNESTEDTABLE_UPDATE:
            return $$state
                .mergeDeep(action.payload)
                .mergeDeep({
                    finalQueryParams: $$state.get('queryParams'),
                    finalChildQueryParams: $$state.get('childQueryParams'),
                })
                .updateIn(['childProps', 'dataSource'], x => EMPTY_OBJECT)
                .updateIn(['childProps', 'loading'], x => EMPTY_OBJECT)

        case CK_COMPONENT_QUERYNESTEDTABLE_UPDATECHILD:
            return $$state.mergeDeep(action.payload, {
                childProps: {
                    dataSource: EMPTY_OBJECT
                },
            })

        case CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL:
            return $$state.update('showSearchTable', x=>!x)

        case CK_COMPONENT_QUERYTABLE_CHANGE:
            return $$state.mergeDeep(action.payload)

        default:
            return $$state
    }
}

export default report