/**
 * Created by c on 4/21/16.
 */
import {
    CK_COMPONENT_QUERYNESTEDTABLE_INIT,
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATECHILD,
} from 'actions/components/QueryNestedTable'





import { account_list_columns } from './data'

const columns = account_list_columns



const initQueryNestedTable = () => {
    const dataSource = []

    //TODO: ajax init
    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYNESTEDTABLE_INIT,
        payload: {
            columns,
            dataSource,
            loading: false,
            childProps: {
                columns: []
            }
        }
    })
}

const updateDataSource = (queryParams, pageIndex = 1) => {
    const dataSource = []
    console.log(queryParams, pageIndex)
    //TODO: ajax by queryParams
    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
        payload: {
            dataSource,
            pagination: {
                total: 300,
                current: 3,
            }
        }
    })
}

const updateChildDataSource = (childQueryParams, rowData, index) => {
    const dataSource = []

    console.log(childQueryParams, rowData, index)
    //TODO: ajax by rowData
    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYNESTEDTABLE_UPDATECHILD,
        payload: {
            childProps: {
                dataSource: {
                    [index]: dataSource
                },
                loading: {
                    [index]: false
                },
            }
        }
    })
}

export {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
}