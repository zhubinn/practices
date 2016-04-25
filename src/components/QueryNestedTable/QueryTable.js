/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form, Button } from 'antd'
import INPUTTYPE from './inputType'

class QueryTable extends React.Component {
    static togglePrefix(name, level) {
        const _prefix = `_ck_qt_${level}_`

        return name.startsWith(_prefix) ?
            name.substr(_prefix) : _prefix + name
    }

    static togglePropPrefix(obj, level) {
        const finalObj = {}

        for (let prop in obj) {
            if (!obj.hasOwnProperty(prop))
                continue

            const finalProp = QueryTable.togglePrefix(prop, level)
            finalObj[finalProp] = obj[prop]
        }
    }

    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        const { form, onQuery } = this.props
        const formVal = form.getFieldsValue()
        const finalFormVal = QueryTable.togglePropPrefix(formVal)

        onQuery(finalFormVal)
    }

    handleClear() {
        const { form } = this.props
        form.resetFields()
    }

    renderControls(col, level) {
        const { queryParams, form } = this.props
        const { getFieldProps } = form
        const fieldName = QueryTable.togglePrefix(col.key, level)
        const fieldProps = getFieldProps(fieldName)

        fieldProps.defaultValue = col.defaultValue
        fieldProps.value = queryParams[fieldName]

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

    renderTable(columns, childProps, level) {
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
                            columns.map(col => (
                                <td>
                                    {
                                        this.renderControls(col, level)
                                    }
                                </td>
                            ))
                        }
                    </tr>
                    </tbody>
                </table>
                {
                    !!childProps && this.renderTable(childProps.columns, childProps.childProps, ++level)
                }
            </div>
        )
    }

    render() {
        const { columns, childProps, show } = this.props

        return !!show ? (
            <Form className="ant-table ant-table-middle ant-table-bordered" onSubmit={this.handleSubmit}>
                { this.renderTable(columns, childProps, 1) }
                <div>
                    <Button type="primary" htmlType="submit">确定</Button>
                    <Button type="ghost" onClick={this.handleClear}>清空</Button>
                </div>
            </Form>
        ) : null
    }
}

QueryTable.propTypes = {
    columns: React.PropTypes.array.isRequired,
    childProps: React.PropTypes.object.isRequired,
    onQuery: React.PropTypes.func.isRequired
}

export default Form.create({
    mapPropsToFields(props) {
        return props.queryParams
    },

    onFieldsChange(props, fields) {
        const finalFields = {}

        for (let field in fields) {
            if (!fields.hasOwnProperty(field))
                continue

            finalFields[field] = fields[field].value
        }

        props.changeQueryParams({
            ...finalFields
        });
    },
})(QueryTable)