/**
 * Created by c on 4/21/16.
 */
const CK_COMPONENT_QUERYNESTEDTABLE_UPDATE = 'CK_COMPONENT_QUERYNESTEDTABLE_UPDATE'
const CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL = 'CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL'
const CK_COMPONENT_QUERYTABLE_CHANGE = 'CK_COMPONENT_QUERYTABLE_CHANGE'

const toggleQueryPanel = () => {
    return {
        type: CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL
    }
}

const changeQueryParams = (queryParams) => {
    console.log(queryParams)
    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYTABLE_CHANGE,
        payload: queryParams
    })
}

export {
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
    CK_COMPONENT_QUERYNESTEDTABLE_TOGGLEQUERYPANEL,
    CK_COMPONENT_QUERYTABLE_CHANGE,
    toggleQueryPanel,
    changeQueryParams,
}