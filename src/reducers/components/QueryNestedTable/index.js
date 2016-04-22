/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
import { CK_COMPONENT_QUERYNESTEDTABLE_UPDATE } from 'actions/components/QueryNestedTable'
import INPUTTYPE from 'components/QueryNestedTable/inputType'

const EMPTY_ARRAY = []
const EMPTY_OBJECT = []

const $$initialState = Immutable.fromJS({
    columns: EMPTY_ARRAY,
    dataSource: EMPTY_ARRAY,
    loading: false,
    showSearchTable: true,
    childProps: {
        columns: EMPTY_ARRAY,
        dataSource: EMPTY_OBJECT,
        loading: EMPTY_OBJECT,
        showSearchTable: EMPTY_OBJECT,
    }
})

const report = ($$state = $$initialState, action) => {
    let payload = action.payload

    switch (action.type) {
        case CK_COMPONENT_QUERYNESTEDTABLE_UPDATE:
            return $$state.merge(payload)

        default:
            return $$state
    }
}

export default report