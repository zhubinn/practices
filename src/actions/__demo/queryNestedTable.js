/**
 * Created by c on 4/21/16.
 */
import {
    CK_COMPONENT_QUERYNESTEDTABLE_INIT,
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATECHILD,
} from 'actions/components/QueryNestedTable'

import {
    account_list_columns,
    account_list_childColumns,
} from './data'

const columns = account_list_columns
const childColumns = account_list_childColumns

const initQueryNestedTable = () => {
    const dataSource = [{
        key: 1,
        Name: '胡彦斌',
        ShortName: '胡',
        Bank: '招商银行'
    }, {
        key: 2,
        Name: '吴彦祖',
        ShortName: '吴',
        Bank: '建设银行'
    }]

    //TODO: ajax init
    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYNESTEDTABLE_INIT,
        payload: {
            columns,
            dataSource,
            loading: false,
            childProps: {
                columns: childColumns
            }
        }
    })
}

const updateDataSource = (queryParams, pageIndex = 1) => {
    const dataSource = [{
        key: 1,
        Name: '胡彦斌1',
        ShortName: '胡1',
        Bank: '招商银行1'
    }, {
        key: 2,
        Name: '吴彦祖2',
        ShortName: '吴2',
        Bank: '建设银行2'
    }]

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
    const dataSource = [{
        key: 1,
        Name1: '胡彦斌3',
        ShortName1: '胡3',
        Bank: '招商银行3'
    }, {
        key: 2,
        Name1: '吴彦祖3',
        ShortName1: '吴3',
        Bank1: '建设银行3'
    }]

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