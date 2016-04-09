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

    renderHeader(isParentTable, columns){
        if(isParentTable) return null

        return (<thead><tr>{this.resolveColumnsTitle(columns).map((colName, i)=><th  key={i}><div style = {{width: ''+ (columns[i].width||150) +'px'}}>{colName}</div></th>)}</tr></thead>)
    }
    render() {

        const {rows, columns, separatedIndexes ,checkedRows, hasDetail,isParentTable, onShowDetail, onCheckRow,onUpdateRow,startIndex, checkMode } = this.props


        return (


            <div className={isParentTable ? "dataTable-baseTable" : "dataTable-subBaseTable"}>
            <table>
                {this.renderHeader(isParentTable, columns)}

                <tbody>

                {
                    rows.map((row, i, rows) => {

                        return (<BaseTr  onUpdateRow = {onUpdateRow} isOnShowDetail = {separatedIndexes.indexOf(i+startIndex)>-1} isOnChecked = {checkedRows.indexOf(i+startIndex)>-1}  checkMode = {checkMode} hasDetail = {hasDetail} row = {row} index = {i + startIndex} columns = {columns} onShowDetail = {onShowDetail} onCheckRow = {onCheckRow} key={i} /> )
                    })

                }


                </tbody>
            </table>
            </div>
        )
    }
}

BaseTable.propTypes = {
    hasDetail: React.PropTypes.bool,
    checkMode: React.PropTypes.bool,
    isParentTable: React.PropTypes.bool,
    checkedRows: React.PropTypes.array,
    separatedIndexes: React.PropTypes.array
}

BaseTable.defaultProps = {
    hasDetail: false,
    checkMode: false,
    isParentTable: true,
    checkedRows: [],
    separatedIndexes: []
}