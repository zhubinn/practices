/**
 * Created by c on 4/21/16.
 */
const CK_COMPONENT_QUERYNESTEDTABLE_UPDATE = 'CK_COMPONENT_QUERYNESTEDTABLE_UPDATE'

const expandRow = (parentRow, index) => {
    const _actionExpandRow = dataSource => {
        return {
            type: CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
            payload: {
                index,
                dataSource,
            }
        }
    }

    const fetchData = dispatch => {
        const url = 'http://esn.chenhuangfang.com/ajax.json'

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            if (response.status >= 400) {
                setTimeout(fetchData, 3000)
            }
            return response.json()
        }).then(json=> {
            if (json.rs) {
                dispatch(_actionExpandRow(CK_COMPONENT_QUERYNESTEDTABLE_UPDATE, json.data))
            } else {
                //TODO:
            }
        })
    }

    return (dispatch, getState) => fetchData(dispatch)
}

const updateDataSource = () => {
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

    const _getDataSource = dataSource => {
        return {
            type: CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
            payload: dataSource
        }
    }

    return (dispatch, getState) => dispatch(_getDataSource(dataSource))
}


export {
    CK_COMPONENT_QUERYNESTEDTABLE_UPDATE,
    expandRow,
    updateDataSource,
}