/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table } from 'antd'
import { isArray } from 'lodash'
import QueryTable from './QueryTable'
import INPUTTYPE from './inputType'
import $ from 'jquery'

export default class QueryNestedTable extends React.Component {
    constructor() {
        super()
        this.handleQuery = this.handleQuery.bind(this)
        this.expandedRowRender = this.expandedRowRender.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
    }

    componentDidMount() {
        const { columns, columns_2, initQueryNestedTable } = this.props
        initQueryNestedTable(columns, columns_2)
    }

    handleQuery() {
        const { updateDataSource, queryParams } = this.props
        updateDataSource(queryParams)
        $('span.ant-table-row-expand-icon.ant-table-row-expanded').click()
    }

    expandedRowRender(record, index) {
        const { childProps } = this.props
        const dataSource = childProps.dataSource[index]

        if (!isArray(dataSource) || dataSource.length === 0) {
            return null
        }

        return (
            <Table
                loading={childProps.loading[index]}
                columns={childProps.columns}
                dataSource={childProps.dataSource[index]}
                pagination={false}
            />
        )
    }

    onRowClick(record, index) {
        const { childProps, finalChildQueryParams } = this.props

        if (!childProps.dataSource[index]) {
            this.props.updateChildDataSource(finalChildQueryParams, record, index)
        }
    }

    render() {
        const {
            columns,
            dataSource,
            childProps,
            queryParams,
            childQueryParams,
            pagination,
            showSearchTable,
            changeQueryParams,
            updateDataSource,
            } = this.props
        pagination.onChange = function (pageIndex) {
            updateDataSource(queryParams, pageIndex)
        }

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
                    onRowClick={this.onRowClick}
                    pagination={pagination}
                />
            </div>
        )
    }
}

QueryNestedTable.propTypes = {
    columns: React.PropTypes.array.isRequired,
    columns_2: React.PropTypes.array.isRequired,
    childProps: React.PropTypes.object.isRequired,
    pagination: React.PropTypes.object,
    initQueryNestedTable: React.PropTypes.func.isRequired,
    updateDataSource: React.PropTypes.func.isRequired,
    updateChildDataSource: React.PropTypes.func.isRequired,
    changeQueryParams: React.PropTypes.func.isRequired,
}