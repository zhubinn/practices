/**
 * Created by janeluck on 4/6/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import BaseTable from './BaseTable'

import './base.css'
import './DataTable.less'

// todo: 获取数据action的详写
import {secondRowsData, secondColumns} from 'components/DataTable/fakeData'



export default class DataTable extends React.Component {
    constructor(props) {
        super(props)

        this.resolveTables = this.resolveTables.bind(this)
        this.renderCheckBtn = this.renderCheckBtn.bind(this)
        this.renderTitleCell = this.renderTitleCell.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
    }

    // 分割table, todo:逻辑分类
    resolveTables(rows, columns, separatedIndexes) {

        let finalTables= []
        if (separatedIndexes.length === 0) return finalTables = [{rows: rows, columns:columns, hasDetail: this.props.hasDetail, startIndex: 0}]

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


        finalTables.push({rows: rows.slice(0, sortableTables[0]+1), columns: columns, hasDetail: true, startIndex: 0})
        finalTables.push({rows:secondRowsData, columns:secondColumns})
        sortableTables.reduce(function(a, b){

            finalTables.push({rows: rows.slice(a+1, b+1), columns: columns, hasDetail: true, startIndex: a + 1})
            finalTables.push({rows:secondRowsData, columns:secondColumns})
            return b
        })

        if (sortableTables[sortableTables.length -1 ] !== rows.length-1){
            finalTables.push({rows: rows.slice(sortableTables[sortableTables.length - 1]+1), columns:columns, hasDetail: true, startIndex: sortableTables[sortableTables.length - 1] + 1})
        }


        return finalTables





    }

    onCheckAll(){
        this.props.onCheckRow(-1, !(this.props.rows.length === this.props.checkedRows.length))
    }

    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }

    // 渲染表头单元格
    renderTitleCell(columns){
        // todo: 渲染函数的参数应该传哪些

        return columns.map((column ,i) => {

            // 列宽度默认为150px(以后考虑引入基础变量)

            return (<th key = {i}><div  style = {{width: ''+ (column.width||150) +'px'}}>{isFunction(column.headerrenderer) ? column.headerrenderer.call(this) : column['text']}</div></th>)
        })
    }

    // 渲染表头'全选'checkbox
    renderCheckBtn(checkMode, rows, checkedRows){
        if (!checkMode) return null
        return (<th ><div  className="small-cell"><input type="checkbox" checked = {rows.length === checkedRows.length} onChange = {this.onCheckAll.bind(this)}/></div></th>)
    }
    renderDetailBtn(hasDetail){
        if (!hasDetail) return null
        return (<th ><div  className="small-cell"></div></th>)
    }


    renderSearch(datafield) {

        let obj = this.props.searchColumns[datafield];
        if (typeof obj === 'undefined' ) return null

        // todo: 拆分
        switch (obj.searchType || 0) {
            case 1:
                return (<input type="text" name = {'search-'+datafield} />)
            case 2:
                return (<input type="datetime-local" name = {'search-'+datafield} />)
            case 3:
                return (<select name = {'search-'+datafield} >
                    {obj.renderData.options.map((item, i) => (<option key = {i} value={item.value}>{item.text}</option>))}
                </select>)
        }
        return null
    }

    render() {

        const {rows, separatedIndexes, columns, searchColumns,  checkedRows, searchBarStatus, source, onShowDetail, onCheckRow,onUpdateRow, checkMode, hasDetail } = this.props
        // notes: 异步操作

        return (
            <div className="dataTable">
                <div className="dataTable-title">
                    <table >
                        <thead>
                        <tr>
                            {this.renderCheckBtn(checkMode, rows, checkedRows)}
                            {this.renderDetailBtn(hasDetail)}

                            {this.renderTitleCell(columns)}
                        </tr>
                        </thead>

                    </table>
                    <table>
                        <tbody>
                            <tr className = {searchBarStatus ? '' : 'hide'}>
                                {checkMode?(<td><div className="small-cell"></div></td>):null}
                                {hasDetail?(<td><div className="small-cell"></div></td>):null}
                                {columns.map((item, i) => (<td  key = {i}><div style = {{width: ''+ (item.width||150) +'px'}}>{this.renderSearch(item.datafield)}</div></td>))}

                            </tr>
                        </tbody>
                    </table>
                </div>
                    {this.resolveTables(rows, columns, separatedIndexes).map(function(item, i){
                        if (!(i%2)) return (<BaseTable separatedIndexes = {separatedIndexes} onUpdateRow={onUpdateRow}  checkedRows = {checkedRows} checkMode = {checkMode} startIndex = {item.startIndex}  key = {i} rows={item.rows} columns={item.columns} hasDetail={item.hasDetail} onShowDetail={onShowDetail} onCheckRow={onCheckRow}/>)
                        return (<BaseTable  key = {i} rows={item.rows} columns={item.columns}  isParentTable = {false} />)
                    })}



            </div>
        )
    }
}


DataTable.propTypes = {
    checkMode: React.PropTypes.bool,
    hasDetail: React.PropTypes.bool,
    searchBarStatus: React.PropTypes.bool,
    separatedIndexes: React.PropTypes.array
}

DataTable.defaultProps = {
    separatedIndexes: [],
    searchBarStatus: false,
    hasDetail: false,

    checkMode: false
}