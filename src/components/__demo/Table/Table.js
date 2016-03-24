/**
 * Created by chenhf on 16-3-23.
 */
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import { warning } from 'react'

import Th from './Th'
import Tr from './Tr'
import Td from './Td'

const COLUMN_KEY = 'key'
const COLUMN_TEXT = 'text'
const STYLE = 'style'
const CLASS = 'className'

export default class Table extends React.Component {
    constructor() {
        super()

        this.state = {
            finalColumns: []
        }
    }

    /**
     * 解析列数据，格式为以下的一种：
     * { alias: '名字', className: 'active', style: { background-color: #666 } }
     * function(){ return (<th>名字</th>) }
     */
    resolveColumn(col) {
        const { finalColumns } = this.state

        if (isPlainObject(col)) {
            const finalCol = {
                [COLUMN_KEY]: col[COLUMN_KEY],
                [COLUMN_TEXT]: col[COLUMN_TEXT],
                [STYLE]: col[STYLE],
                [CLASS]: col[CLASS],
            }

            finalColumns.push(finalCol)

            return (<Th {...finalCol}/>)
        }

        finalColumns.push({
            [COLUMN_KEY]: col.getKey()
        })

        return col
    }

    resolveRow(row) {
        const { finalColumns } = this.state

        return (
            <tr data={row}>
                {
                    finalColumns.map(col => {
                        const key = col[COLUMN_KEY]
                        return isString(key) ? <Td text={row[key]}/> : key
                    })
                }
            </tr>
        )
    }

    render() {
        const {
            style,
            ...other
            } = this.props

        return (
            <table {...other} style={Object.assign({}, style)}>
                <thead>
                <tr>
                    { this.props.columns.map(this.resolveColumn.bind(this)) }
                </tr>
                </thead>
                <tbody>
                { this.props.rows.map(this.resolveRow.bind(this)) }
                </tbody>
                {this.props.children}
            </table>
        )
    }
}

Table.propTypes = {
    columns: React.PropTypes.array.isRequired,
    rows: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
        React.PropTypes.func
    ]).isRequired
}