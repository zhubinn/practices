/**
 * Created by janeluck on 4/6/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import BaseTable from './BaseTable'

import './DataTable.less'

// todo: 获取数据action的详写
import {secondRowsData, secondColumns} from 'components/DataTable/fakeData'



export default class DataTable extends React.Component {
    constructor(props) {
        super(props)

        this.resolveTables = this.resolveTables.bind(this)

    }

    // 分割table, todo:逻辑分类
    resolveTables(rows, columns, separatedIndexes) {

        let finalTables= []
        if (separatedIndexes.length === 0) return finalTables = [{rows: rows, columns:columns, hasDetail: true, startIndex: 0}]

        if (separatedIndexes.length === 1) return finalTables = [{rows: rows.slice(0 ,separatedIndexes[0]+1), columns: columns, hasDetail:true,startIndex: 0},{rows:secondRowsData, columns:secondColumns}, {rows: rows.slice(separatedIndexes[0]+1), columns: columns, hasDetail:true,startIndex: separatedIndexes[0] + 1}]

        let sortableTables = separatedIndexes.sort(function (a, b) {
            return a - b
        })

        if (separatedIndexes.length === 2){

            return finalTables = [
                {rows:rows.slice(0, sortableTables[0]+1), columns: columns, hasDetail: true, startIndex: 0},
                {rows: secondRowsData, columns: secondColumns},
                {rows:rows.slice(sortableTables[0]+1, sortableTables[1]+1), columns: columns, hasDetail: true, startIndex: sortableTables[0] + 1},
                {rows: secondRowsData, columns: secondColumns},
                {rows:rows.slice(sortableTables[1]+1), columns: columns, hasDetail: true, startIndex: sortableTables[1] + 1}
            ]
        }
        sortableTables.reduce(function(a, b){
            finalTables.push({rows: rows.slice(a, b), columns: columns, hasDetail: true, startIndex: a + 1})
            finalTables.push({rows:secondRowsData, columns:secondColumns})
            return b
        })
        finalTables.push({rows: rows.slice(sortableTables[sortableTables.length - 1]), columns:columns, hasDetail: true, startIndex: sortableTables[sortableTables.length - 1] + 1})


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
                        if (item.hasDetail) return (<BaseTable startIndex = {item.startIndex}  key = {i} rows={item.rows} columns={item.columns} hasDetail={item.hasDetail} onShowDetail={onShowDetail}/>)
                        return (<BaseTable  key = {i} rows={item.rows} columns={item.columns} />)
                    })}


                </div>
            </div>
        )
    }
}


DataTable.propTypes = {
    checkMode: React.PropTypes.bool,
    hasDetail: React.PropTypes.bool,
    separatedIndexes: React.PropTypes.array
}

DataTable.defaultProps = {
    separatedIndexes: [],
    hasDetail: false,
    checkMode: false
}