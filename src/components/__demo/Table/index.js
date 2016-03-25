/**
 * Created by chenhf on 16-3-23.
 */
import { isPlainObject, isFunction, isString } from 'lodash'
import warning from 'fbjs/lib/warning'
import Th from './Th'

const COLUMN_KEY = 'key'
const COLUMN_TEXT = 'text'
const COLUMN_FORMAT = 'format'
const STYLE = 'style'
const CLASS = 'className'
const EMPTY_FORMAT = x => x

class Table extends React.Component {
    constructor(props) {
        super(props)

        const { dispatch } = this.props

        this.dispatch = dispatch
        this.finalColumns = []
    }

    componentWillUpdate() {
        this.finalColumns = []
    }

    /**
     * 解析列数据，格式为以下的一种：
     * { key: 'name', text: '名字', className: 'active', style: { background-color: #666 } }
     * <Th key="name">名字</Th>
     * { key: Table.thunk((row, index, context) => {
     *      return (
     *      <td>
     *          <button onClick={ e=> {
     *              row.name = '成功啦'
     *              context.dispatch({
     *                  type: CK_REPORT_UPDATE,
     *                  payload: {
     *                  row,
     *                  index
     *                  }
     *              })
     *          }}>修改</button>
     *      </td>
     *   }, text: '名字', className: 'active', style: { background-color: #666 } }
     */
    resolveColumn(col) {
        if (!isPlainObject(col)) {
            warning(false, '数据rows的格式必须是：[ Plain Object, ReactElement, ... ]')
        }

        let finalCol = {
            [COLUMN_KEY]: col[COLUMN_KEY]
        }

        this.finalColumns.push(finalCol)

        if (!React.isValidElement(col)) {
            finalCol[COLUMN_TEXT] = col[COLUMN_TEXT]
            finalCol[COLUMN_FORMAT] = col[COLUMN_FORMAT]
            finalCol[STYLE] = col[STYLE]
            finalCol[CLASS] = col[CLASS]

            return (<Th {...finalCol}/>)
        }

        finalCol[COLUMN_FORMAT] = col.props[COLUMN_FORMAT]

        return col
    }

    resolveRow(row, index) {
        const context = this

        return (
            <tr>
                {
                    this.finalColumns.map((col, i) => {
                        const key = col[COLUMN_KEY]
                        const format = col[COLUMN_FORMAT] || EMPTY_FORMAT

                        return isString(key) ? <td>{ format(row[key]) }</td> : key(row, index, context)
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

                { this.props.children }
            </table>
        )
    }
}

/**
 * 用于生成columns里的key
 * @param headCellCreator function, return ReactElement(JSX)
 * @returns {Function}
 */
Table.thunk = (headCellCreator) => {
    return (...args) => {
        return headCellCreator(...args)
    }
}

/**
 * 传递dispatch
 * @param action Redux的Action
 * @returns {Function}
 */
Table.dispatch = action => {
    return (dispatch, getState) => {
        return dispatch(action)
    }
}

Table.propTypes = {
    columns: React.PropTypes.array.isRequired,
    rows: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
        React.PropTypes.func,
    ]).isRequired,
    dispatch: React.PropTypes.func.isRequired,
}

export default Table