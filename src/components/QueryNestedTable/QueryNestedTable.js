/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table } from 'antd'
import QueryTable from './QueryTable'
import INPUTTYPE from './inputType'

export default class QueryNestedTable extends React.Component {
    constructor() {
        super()
        this.handleQuery = this.handleQuery.bind(this)
        this.expandedRowRender = this.expandedRowRender.bind(this)
    }

    componentDidMount() {
        const { columns, columns_2, initQueryNestedTable } = this.props
        initQueryNestedTable(columns, columns_2)
    }

    handleQuery() {
        const { queryParams } = this.props
        this.props.updateDataSource(queryParams)
    }

    expandedRowRender(...args) {
        const [ rowData, index ] = [...args]
        const { childProps, childQueryParams } = this.props

        this.props.updateChildDataSource(childQueryParams, rowData, index)

        return (
            <Table
                loading={childProps.loading[index]}
                columns={childProps.columns}
                dataSource={childProps.dataSource[index]}
                pagination={false}
            />
        )
    }

    render() {
        const {
            columns,
            dataSource,
            childProps,
            queryParams,
            childQueryParams,
            showSearchTable,
            changeQueryParams,
            } = this.props

        return (
            <div className="ck_qntable">
                <QueryTable
                    show={showSearchTable}
                    dataSource={dataSource}
                    columns={columns}
                    childProps={childProps}
                    queryParams={queryParams}
                    childQueryParams={childQueryParams}
                    onQuery={this.handleQuery}
                    changeQueryParams={changeQueryParams}
                />
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    expandedRowRender={this.expandedRowRender}
                />
            </div>
        )
    }
}

QueryNestedTable.propTypes = {
    columns: React.PropTypes.array.isRequired,
    columns_2: React.PropTypes.array.isRequired,
    childProps: React.PropTypes.object.isRequired,
    initQueryNestedTable: React.PropTypes.func.isRequired,
    updateDataSource: React.PropTypes.func.isRequired,
    updateChildDataSource: React.PropTypes.func.isRequired,
    changeQueryParams: React.PropTypes.func.isRequired,
}