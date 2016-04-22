/**
 * Created by c on 4/21/16.
 */
import { CK_COMPONENT_QUERYNESTEDTABLE_UPDATE } from 'actions/components/QueryNestedTable'

const updateDataSource = (columnsFirstLevel, columnsSecondLevel) => {
    const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }]

    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
        payload: {
            columns: columnsFirstLevel,
            dataSource,
            loading: false,
            showSearchTable: true,
            childProps: {
                columns: columnsSecondLevel,
            }
        }
    })
}

const updateChildDataSource = (rowData, index) => {
    const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }]

    return (dispatch, getState) => dispatch({
        type: CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
        payload: {
            childProps: {
                dataSource: {
                    0: dataSource,
                    1: dataSource
                },
                loading: {
                    0: false,
                    1: dataSource
                },
                showSearchTable: {
                    0: true,
                    1: false
                },
            }
        }
    })
}


export {
    updateDataSource,
    updateChildDataSource,
}