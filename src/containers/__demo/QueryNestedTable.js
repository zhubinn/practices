/**
 * Created by c on 4/21/16.
 */
import { connect } from 'react-redux'
import { Breadcrumb, Button } from 'antd'
import QueryNestedTable from 'components/QueryNestedTable'
import INPUTTYPE from 'components/QueryNestedTable/inputType'
import {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
} from 'actions/__demo/queryNestedTable'
import {
    toggleQueryPanel,
    changeQueryParams,
} from 'actions/components/QueryNestedTable'
import 'antd/style/index.less'
import {
    account_list_columns,
    account_list_columns_2,
} from './data'

const columns = account_list_columns
const columns_2 = account_list_columns_2

class QueryNestedTablePage extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {
            initQueryNestedTable,
            updateDataSource,
            updateChildDataSource,
            toggleQueryPanel,
            changeQueryParams,
            } = this.props
        const {
            showSearchTable,
            dataSource,
            childProps,
            queryParams,
            childQueryParams,
            } = this.props.$$QueryNestedTable.toJS()

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>客户</Breadcrumb.Item>
                    <Breadcrumb.Item href="">客户列表</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Button type="ghost">变更联系人</Button>
                    <Button type="ghost">导出</Button>
                    <Button type="primary" onClick={toggleQueryPanel}>筛选</Button>
                </div>
                <QueryNestedTable
                    showSearchTable={showSearchTable}
                    columns={columns}
                    columns_2={columns_2}
                    dataSource={dataSource}
                    childProps={childProps}
                    queryParams={queryParams}
                    childQueryParams={childQueryParams}
                    initQueryNestedTable={initQueryNestedTable}
                    updateDataSource={updateDataSource}
                    updateChildDataSource={updateChildDataSource}
                    changeQueryParams={changeQueryParams}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$QueryNestedTable: state.components.QueryNestedTable
    }
}

export default connect(mapStateToProps, {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
    toggleQueryPanel,
    changeQueryParams,
})(QueryNestedTablePage)