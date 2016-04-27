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
        const {
            immutableState,
            initQueryNestedTable,
            } = this.props
        const {
            columns,
            childColumns,
            } = immutableState

        initQueryNestedTable(columns, childColumns)
    }

    handleQuery() {
        const {
            immutableState,
            updateDataSource,
            } = this.props
        const {
            queryParams
            } = immutableState
        updateDataSource(queryParams)
        $('span.ant-table-row-expand-icon.ant-table-row-expanded').click()
    }

    expandedRowRender(record, index) {
        const { childProps } = this.props.immutableState
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
        const {
            immutableState,
            updateChildDataSource,
            } = this.props
        const {
            childProps,
            finalChildQueryParams,
            } = immutableState

        if (!childProps.dataSource[index]) {
            updateChildDataSource(finalChildQueryParams, record, index)
        }
    }

    render() {
        const {
            immutableState,
            updateDataSource,
            changeQueryParams,
            } = this.props

        const {
            columns,
            dataSource,
            childProps,
            queryParams,
            childQueryParams,
            pagination,
            showSearchTable,
            } = immutableState

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
    childProps: React.PropTypes.object.isRequired,
    initQueryNestedTable: React.PropTypes.func.isRequired,
    updateDataSource: React.PropTypes.func.isRequired,
    updateChildDataSource: React.PropTypes.func.isRequired,
    changeQueryParams: React.PropTypes.func.isRequired,
}