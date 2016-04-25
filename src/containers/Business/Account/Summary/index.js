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
} from 'actions/business/account/summary'
import {
    toggleQueryPanel,
} from 'actions/components/QueryNestedTable'
import 'antd/style/index.less'
import { account_summary_columns, account_summary_business_columns } from './data'

const columns = account_summary_columns
const columns_2 = account_summary_business_columns

class Account_Summary_Page extends React.Component {
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
        $$QueryNestedTable: state.components.QueryNestedTable
    }
}

export default connect(mapStateToProps, {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
    toggleQueryPanel,
})(Account_Summary_Page)