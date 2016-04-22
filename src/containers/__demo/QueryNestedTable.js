/**
 * Created by c on 4/21/16.
 */
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'
import QueryNestedTable from 'components/QueryNestedTable'
import INPUTTYPE from 'components/QueryNestedTable/inputType'
import { updateDataSource, updateChildDataSource } from 'actions/__demo/queryNestedTable'
import 'antd/style/index.less'

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    inputType: INPUTTYPE.DATE,
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    inputType: INPUTTYPE.STRING,
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    inputType: INPUTTYPE.NUMBER,
}];

class QueryNestedTablePage extends React.Component {
    constructor() {
        super()
        this.updateDataSource = this.updateDataSource.bind(this)
    }

    updateDataSource() {
        this.props.updateDataSource(columns, columns)
    }

    render() {
        const { updateChildDataSource } = this.props
        const {
            dataSource,
            childProps,
            showSearchTable,
            } = this.props.$$QueryNestedTable.toJS()

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>客户</Breadcrumb.Item>
                    <Breadcrumb.Item href="">客户列表</Breadcrumb.Item>
                </Breadcrumb>
                <QueryNestedTable
                    showSearchTable={showSearchTable}
                    dataSource={dataSource}
                    columns={columns}
                    childProps={childProps}
                    size="middle"
                    bordered
                    updateDataSource={this.updateDataSource}
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
    updateDataSource,
    updateChildDataSource,
})(QueryNestedTablePage)