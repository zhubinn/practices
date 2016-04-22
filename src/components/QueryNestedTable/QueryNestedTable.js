/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form } from 'antd'
import INPUTTYPE from './inputType'

export default class QueryNestedTable extends React.Component {
    constructor() {
        super()
        this.expandedRowRender = this.expandedRowRender.bind(this)
        this.renderSearchTable = this.renderSearchTable.bind(this)
    }

    componentDidMount() {
        this.props.updateDataSource()
    }

    expandedRowRender(...args) {
        const [ rowData, index ] = [...args]
        const { childProps } = this.props

        return (
            <Table
                loading={childProps.loading[index]}
                dataSource={childProps.dataSource[index]}
                columns={childProps.columns}
            />
        )
    }

    handleSubmit() {
        console.log(arguments)
    }

    renderControls(col) {
        const onChange = col

        switch (col.inputType) {
            case INPUTTYPE.DATE:
                return <TimePicker onChange={onChange}/>
            case INPUTTYPE.NUMBER:
                return <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
            case INPUTTYPE.STRING:
                return <input type="text"/>
            default:
                return null
        }
    }

    renderSearchTable(columns, childProps) {
        const renderTable = (columns, childProps) => {
            return (
                <table>
                    <thead className="ant-table-thead">
                    <tr>
                        {
                            columns.map(col => <th>{col.title}</th>)
                        }
                    </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                    <tr className="ant-table-row  ant-table-row-level-0">
                        {
                            columns.map(col => <td>{ this.renderControls(col) }</td>)
                        }
                    </tr>
                    </tbody>
                </table>
            )
        }
        return (
            <Form className="ant-table ant-table-middle ant-table-bordered" onSubmit={this.handleSubmit}>
                <div className="ant-table-body">
                    {renderTable(columns, childProps)}
                </div>
                { !!childProps && renderTable(childProps.columns, childProps.childProps) }
            </Form>
        )
    }

    render() {
        const { dataSource, columns, childProps, showSearchTable } = this.props

        return (
            <div className="ck_qntable">
                { !!showSearchTable && this.renderSearchTable(columns, childProps) }
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="middle"
                    bordered
                    expandedRowRender={this.expandedRowRender}
                />
            </div>
        )
    }
}

QueryNestedTable.propTypes = {
    childProps: React.PropTypes.object.isRequired
}