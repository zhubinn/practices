/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form } from 'antd'
import INPUTTYPE from './inputType'

class QueryTable extends React.Component {
    handleSubmit() {
        this.props.onSubmit()
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

    renderTable(columns, childProps) {
        return (
            <div className="ant-table-body">
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
                { !!childProps && this.renderTable(childProps.columns, childProps.childProps) }
            </div>
        )
    }

    render() {
        const { dataSource, columns, childProps, showSearchTable } = this.props
        console.log(columns)

        return (
            <Form className="ant-table ant-table-middle ant-table-bordered" onSubmit={this.handleSubmit}>
                { this.renderTable(columns, childProps) }
                <div>
                    <button disabled>查询</button>
                </div>
            </Form>
        )
    }
}

QueryTable.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

export default QueryTable;