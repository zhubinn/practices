/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form, Button } from 'antd'
import INPUTTYPE from './inputType'

const prefix = '_ck_qt_1_'
const childPrefix = '_ck_qt_2_'

class QueryTable extends React.Component {
    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        this.props.onQuery()
    }

    handleClear() {
        const { form } = this.props

        form.resetFields()
    }

    renderControls(col, level) {
        const { queryParams, childQueryParams, form } = this.props
        const { getFieldProps } = form

        const fieldName = `_ck_qt_${level}_${col.key}`
        const fieldProps = getFieldProps(fieldName)

        fieldProps.defaultValue = col.defaultValue

        if (queryParams.hasOwnProperty(col.key)) {
            fieldProps.value = queryParams[col.key]

        } else if (childQueryParams.hasOwnProperty(col.key)) {
            fieldProps.value = childQueryParams[col.key]
        }

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

    renderTable(columns, level) {
        return (
            <div>
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
            </div>
        )
    }

    render() {
        const { columns, childProps, show } = this.props
        const styleObj = {
            width: '100%',
            'overflow-x': 'auto'
        }

        return !!show ? (
            <Form className="ant-table ant-table-middle ant-table-bordered" onSubmit={this.handleSubmit}>
                <div className="ant-table-body" style={styleObj}>
                    { this.renderTable(columns, 1) }
                    { !!childProps && this.renderTable(childProps.columns, 2) }
                </div>
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
        const finalObj = {}

        for (let prop in props.queryParams) {
            if (!props.queryParams.hasOwnProperty(prop))
                continue

            const finalProp = prefix + prop
            finalObj[finalProp] = props.queryParams[prop]
        }

        for (let prop in props.childQueryParams) {
            if (!props.childQueryParams.hasOwnProperty(prop))
                continue

            const finalProp = prefix + prop
            finalObj[finalProp] = props.childQueryParams[prop]
        }

        return finalObj
    },

    onFieldsChange(props, fields) {
        const finalFields = {
            queryParams: {},
            childQueryParams: {},
        }

        for (let field in fields) {
            if (!fields.hasOwnProperty(field))
                continue

            if (field.startsWith(prefix)) {
                const finalField = field.substr(prefix.length)
                finalFields.queryParams[finalField] = fields[field].value

            } else if (field.startsWith(childPrefix)) {
                const finalField = field.substr(childPrefix.length)
                finalFields.childQueryParams[finalField] = fields[field].value
            }
        }

        props.changeQueryParams({
            ...finalFields
        });
    },
})(QueryTable)