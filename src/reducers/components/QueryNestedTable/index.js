/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import {
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
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
    queryParams: {}
})

const report = ($$state = $$initialState, action) => {
    switch (action.type) {
        case CK_COMPONENT_QUERYNESTEDTABLE_UPDATE:
            return $$state.mergeDeep(action.payload)

        case CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL:
            return $$state.update('showSearchTable', x=>!x)

        case CK_COMPONENT_QUERYTABLE_CHANGE:
            return $$state.update('queryParams', $$params=> {
                return $$params.merge(action.payload)
            })

        default:
            return $$state
    }
}

export default report