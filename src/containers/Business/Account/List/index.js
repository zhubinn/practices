/**
 * Created by janeluck on 4/25/16.
 */

import { connect } from 'react-redux'
import { Breadcrumb, Button } from 'antd'
import QueryNestedTable from 'components/QueryNestedTable'
import INPUTTYPE from 'components/QueryNestedTable/inputType'
import {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
} from 'actions/business/account/list'
import {
    toggleQueryPanel,
} from 'actions/components/QueryNestedTable'
import 'antd/style/index.less'
import { account_list_columns } from './data'

const columns = account_list_columns


class Account_List_Page extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {
            initQueryNestedTable,
            updateDataSource,
            updateChildDataSource,
            toggleQueryPanel,
            } = this.props
        const {
            showSearchTable,
            dataSource,
            childProps,
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

                    dataSource={dataSource}
                    childProps={childProps}
                    initQueryNestedTable={initQueryNestedTable}
                    updateDataSource={updateDataSource}
                    updateChildDataSource={updateChildDataSource}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$QueryNestedTable: state.components.QueryNestedTable,
        $$account_list: state.business.account_list
    }
}

export default connect(mapStateToProps, {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
    toggleQueryPanel,
})(Account_List_Page)