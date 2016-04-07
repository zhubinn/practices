/**
 * Created by janeluck on 4/6/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import BaseTable from './BaseTable'

import './DataTable.less'


class Tr extends React.Component {
    render() {
        return (<tr></tr>)
    }
}

export default class DataTable extends React.Component {
    constructor(props) {
        super(props)

        this.resolveTables = this.resolveTables.bind(this)

    }

    // 分割table
    resolveTables(rows, columns, separatedIndexes) {
        //todo: 数组处理
        let finalTables= []
        if (separatedIndexes.length === 0) return finalTables = [{rows: rows, columns:columns, hasDetail: true}]

        if (separatedIndexes.length === 1) return finalTables = [{rows: rows.slice(0 ,separatedIndexes[0]+1), columns: columns, hasDetail:true},{rows:rows, columns:columns}, {rows: rows.slice(separatedIndexes[0]+2), columns: columns, hasDetail:true}]

        let sortableTables = separatedIndexes.sort(function (a, b) {
            return a - b
        })


        sortableTables.reduce(function(a, b){
            finalTables.push({rows: rows.slice(a, b), columns: columns, hasDetail: true})
            finalTables.push({rows:rows, columns:columns})
            return b
        })


        console.log(finalTables)
        return finalTables





    }

    /* showDetailClicked(i){
     this.props.onShowDetail(i)
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

     }*/

    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }


    render() {

        const {rows, separatedIndexes, source, columns, searchColumns, onShowDetail } = this.props
        // notes: 异步操作

        return (
            <div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            {this.resolveColumnsTitle(columns).map((colName, i)=><th key={i}>{colName}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>

                    {this.resolveTables(rows, columns, separatedIndexes).map(function(item, i){
                        if (item.hasDetail) return (<BaseTable key = {i} rows={item.rows} columns={item.columns} hasDetail={item.hasDetail} onShowDetail={onShowDetail}/>)
                        return (<BaseTable key = {i} rows={item.rows} columns={item.columns} />)

                    })}


                </div>
            </div>
        )
    }
}


DataTable.propTypes = {}

DataTable.defaultProps = {
    separatedIndexes: [],
    hasDetail: false
}