/**
 * Created by c on 4/21/16.
 */
import { connect } from 'react-redux'
import { Breadcrumb, Button } from 'antd'
import QueryNestedTable from 'components/QueryNestedTable'
import {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
} from 'actions/__demo/queryNestedTable'
import {
    toggleQueryPanel,
} from 'actions/components/QueryNestedTable'

class QueryNestedTablePage extends React.Component {
    render() {
        const {
            $$QueryNestedTable,
            initQueryNestedTable,
            updateDataSource,
            updateChildDataSource,
            toggleQueryPanel,
            } = this.props

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
                    immutableState={$$QueryNestedTable.toJS()}
                    init={initQueryNestedTable}
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
})(QueryNestedTablePage)