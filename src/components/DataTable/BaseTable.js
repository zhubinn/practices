/**
 * Created by janeluck on 4/7/16.
 */
import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import BaseTr from './BaseTr'
export default class BaseTable extends React.Component {
    constructor(props) {
        super(props)


    }



    // 解析需要展示的列, 并从row中取出字段对应内容(文本或者虚拟dom)
    resolveRow(row, columns) {

        return columns.map((col, i) => col['datafield'])
            .map((keyName, i) => ({
                    keyName: keyName,
                    // 判断该列是否为自定义渲染
                    text: isFunction(columns[i]['cellsrenderer']) ? columns[i]['cellsrenderer'].call(this, row, columns[i], row[keyName]) : row[keyName]
                })
            )

    }

    resolveColumnsTitle(columns) {


        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }

    renderHeader(hasDetail, columns){
        if(hasDetail) return null

        return (<thead><tr>{this.resolveColumnsTitle(columns).map((colName, i)=><th key={i}>{colName}</th>)}</tr></thead>)
    }
    render() {

        const {rows, columns, hasDetail, onShowDetail, startIndex } = this.props


        return (



            <table>
                {this.renderHeader(hasDetail, columns)}

                <tbody>

                {
                    rows.map((row, i) => {

                        return (<BaseTr hasDetail = {hasDetail} row = {row} index = {i + startIndex} columns = {columns} onShowDetail = {onShowDetail}  key={i} /> )
                    })

                }


                </tbody>
            </table>

        )
    }
}

BaseTable.propTypes = {
    hasDetail: React.PropTypes.bool,
    checkMode: React.PropTypes.bool
}

BaseTable.defaultProps = {
    hasDetail: false,
    checkMode: false
}