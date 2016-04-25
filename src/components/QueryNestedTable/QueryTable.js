/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form, Button } from 'antd'
import INPUTTYPE from './inputType'

class QueryTable extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formVal = this.props.form.getFieldsValue()
        this.props.onQuery(formVal)
    }

    handleClear() {

    }

    renderControls(col) {
        const onChange = col
        const { getFieldProps } = this.props.form

        switch (col.inputType) {
            case INPUTTYPE.DATE:
                return <TimePicker {...getFieldProps(col.key)} onChange={onChange}/>
            case INPUTTYPE.NUMBER:
                return <InputNumber {...getFieldProps(col.key)} min={1} max={10} defaultValue={3} onChange={onChange}/>
            case INPUTTYPE.STRING:
                return <input {...getFieldProps(col.key)} type="text"/>
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
        const { columns, childProps, show } = this.props

        if (!show)
            return null

        return (
            <Form className="ant-table ant-table-middle ant-table-bordered" onSubmit={this.handleSubmit}>
                { this.renderTable(columns, childProps) }
                <div>
                    <Button type="primary" htmlType="submit">确定</Button>
                    <Button type="ghost" onClick={this.handleClear}>清空</Button>
                </div>
            </Form>
        )
    }
}

QueryTable.propTypes = {
    columns: React.PropTypes.array.isRequired,
    onQuery: React.PropTypes.func.isRequired
}

export default Form.create()(QueryTable)