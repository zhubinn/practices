/**
 * Created by c on 4/21/16.
 */
import { findDOMNode } from 'react-dom'
import { Table, TimePicker, InputNumber, Form, Button } from 'antd'
import INPUTTYPE from './inputType'

const prefix = '_ck_qt_'

class QueryTable extends React.Component {
    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.setState({
            formVal1: null,
            formVal2: null,
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { form, onQuery } = this.props
        const formVal = form.getFieldsValue()
        const prefix1 = '_ck_qt_1_'
        const prefix2 = '_ck_qt_2_'
        const formVal1 = {}
        const formVal2 = {}

        for (let prop in formVal) {
            if (!formVal.hasOwnProperty(prop))
                continue

            if (prop.startsWith(prefix1)) {
                formVal1[prop.substr(prefix1.length)] = formVal[prop]

            } else if (prop.startsWith(prefix2)) {
                formVal2[prop.substr(prefix2.length)] = formVal[prop]
            }
        }

        this.setState({
            formVal1,
            formVal2,
        })

        onQuery(formVal1)
    }

    handleClear() {
        const { form } = this.props

        form.resetFields(this.state.finalFormVal)
    }

    renderControls(col, level) {
        const { queryParams, form } = this.props
        const { getFieldProps } = form
        const fieldName = `_ck_qt_${level}_${col.key}`
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
        const finalObj = {}

        for (let prop in props.queryParams) {
            if (!props.queryParams.hasOwnProperty(prop))
                continue

            const finalProp = prop.substr(prefix.length + 2)
            finalObj[finalProp] = props.queryParams[prop]
        }
        return finalObj
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