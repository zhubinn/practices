/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form, Button } from 'antd'
import INPUTTYPE from './inputType'

const prefix = 'qt_'

class QueryTable extends React.Component {
    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        const { form } = this.props
        const formVal = form.getFieldsValue()
        const finalFormVal = {}

        for (let field in formVal) {
            if (!formVal.hasOwnProperty(field))
                continue

            const finalField = field.substr(prefix.length)
            finalFormVal[finalField] = formVal[field]
        }
        this.props.onQuery(finalFormVal)
    }

    handleClear() {
        const { form } = this.props
        form.resetFields()
    }

    renderControls(col) {
        const { getFieldProps } = this.props.form
        const {
            value,
            ...fieldProps
            } = getFieldProps(prefix + col.key)
        fieldProps.defaultValue = col.defaultValue
        console.log(fieldProps)

        switch (col.inputType) {
            case INPUTTYPE.DATE:
                return <TimePicker {...fieldProps} />
            case INPUTTYPE.NUMBER:
                return <InputNumber {...fieldProps} />
            case INPUTTYPE.STRING:
                return <input {...fieldProps} type="text"/>
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

export default Form.create({
    mapPropsToFields(props) {
        const { queryParams } = props
        const finalQueryParams = {}

        for (let param in queryParams) {
            if (!queryParams.hasOwnProperty(param))
                continue

            const finalField = prefix + param
            finalQueryParams[finalField] = queryParams[param]
        }
        return finalQueryParams;
    },

    onFieldsChange(props, fields) {
        const finalFields = {}

        for (let field in fields) {
            if (!fields.hasOwnProperty(field))
                continue

            const finalField = field.substr(prefix.length)
            finalFields[finalField] = fields[field].value
        }
        props.changeQueryParams({
            ...finalFields
        });
    },
})(QueryTable)