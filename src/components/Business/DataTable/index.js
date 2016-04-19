/**
 * Created by janeluck on 4/6/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import randomString  from 'random-string'
import BaseTable from './BaseTable'

import './base.css'
import './DataTable.less'

// todo: 获取数据action的详写
import {secondRowsData, secondColumns} from 'components/Business/DataTable/fakeData'


export default class DataTable extends React.Component {
    constructor(props) {
        super(props)

        this.resolveTables = this.resolveTables.bind(this)
        this.renderCheckBtn = this.renderCheckBtn.bind(this)
        this.renderTitleCell = this.renderTitleCell.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
        this.getCheckedRows = this.getCheckedRows.bind(this)
        this.getCheckedIndexes = this.getCheckedIndexes.bind(this)
        this.identity = 'dataTable_' + randomString()
    }

    // 分割table
    resolveTables(rows, columns, selectedRowDetailObj) {
        let tableRowArr = []
        let prevRowArr = []

        rows.forEach((row, i) => {
            row.index = i
            prevRowArr.push(row)

            if (selectedRowDetailObj.hasOwnProperty(i)) {

                tableRowArr.push({rows: prevRowArr, columns: columns, hasDetail: true})
                prevRowArr = []

                tableRowArr.push(selectedRowDetailObj[i])
            }

        })


        if (!!prevRowArr.length) {
            tableRowArr.push({rows: prevRowArr, columns: columns, hasDetail: this.props.hasDetail})
        }

        return tableRowArr

    }

    onCheckAll() {
        this.props.onCheckRow(-1, !(this.props.rows.length === this.props.checkedRows.length), this.props.source)
    }

    // 输出已经checked的rows的索引
    getCheckedIndexes() {
        return this.props.checkedRows
    }

    // 按序输出已经checked的rows
    getCheckedRows() {
        let arr = []
        this.props.rows.forEach((row, i) => {
            if (this.props.checkedRows.indexOf(i) > -1) {
                arr.push(row)
            }
        })
        return arr


    }

    // 高级搜索点击确定后获取表单数据
    getSearchForm() {
        // todo: 如果页面存在多个实例 `bug`

        document.querySelectorAll('[name^="search-"]')

    }


    resolveColumnsTitle(columns) {
        //todo: 判断字段hidden是否存在和其的值
        /* 返回表头文本数组
         ['姓名', '年龄']
         */
        return columns.map((col, i) => col['text'])
    }

    calculateWidth(columns, checkMode, hasDetail) {

        let width = 0

        width = columns.map((col, i) => {
            // 列宽度默认为150px(以后考虑引入基础变量)
            return col.width || 150
        }).reduce((a, b) => {
            return a + b
        })


        checkMode && ( width = width + 50 )
        hasDetail && ( width = width + 50 )

        return width
    }

    // 渲染表头单元格
    renderTitleCell(columns) {
        // todo: 渲染函数的参数应该传哪些

        return columns.map((column, i) => {

            // 列宽度默认为150px(以后考虑引入基础变量)

            return (<th key={i}>
                <div
                    style={{width: ''+ (column.width||150) +'px'}}>{isFunction(column.headerrenderer) ? column.headerrenderer.call(this) : column['text']}</div>
            </th>)
        })
    }

    // 渲染表头'全选'checkbox
    renderCheckBtn(checkMode, rows, checkedRows) {
        if (!checkMode) return null
        return (<th >
            <div className="small-cell"><input type="checkbox" checked={rows.length === checkedRows.length}
                                               onChange={this.onCheckAll.bind(this)}/></div>
        </th>)
    }

    renderDetailBtn(hasDetail) {
        if (!hasDetail) return null
        return (<th >
            <div className="small-cell"></div>
        </th>)
    }


    renderSearch(datafield) {

        let obj = this.props.searchColumns[datafield];
        if (typeof obj === 'undefined') return null

        // todo: 拆分
        switch (obj.searchType || 0) {
            case 1:
                return (<input type="text" name={'search-'+datafield}/>)
            case 2:
                return (<input type="datetime-local" name={'search-'+datafield}/>)
            case 3:
                return (<select name={'search-'+datafield}>
                    {obj.renderData.options.map((item, i) => (<option key={i} value={item.value}>{item.text}</option>))}
                </select>)
        }
        return null
    }

    render() {

        const {rows,
            selectedRowDetailObj,
            columns,
            searchColumns,
            checkedRows,
            pending,
            searchBarStatus,

            onShowDetail,
            onCheckRow,
            onUpdateRow,
            checkMode,
            hasDetail

            } = this.props


        return (
            <div className="dataTableWrap">
                <div className="dataTable" id={this.identity}
                     style={{width: ''+ (this.calculateWidth(columns, checkMode, hasDetail)) +'px'}}>
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
                            <tr className={searchBarStatus ? '' : 'hide'}>
                                {checkMode ? (<td>
                                    <div className="small-cell"></div>
                                </td>) : null}
                                {hasDetail ? (<td>
                                    <div className="small-cell"></div>
                                </td>) : null}
                                {columns.map((item, i) => (<td key={i}>
                                    <div
                                        style={{width: ''+ (item.width||150) +'px'}}>{this.renderSearch(item.datafield)}</div>
                                </td>))}

                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/*    <div className={pending ? '' : 'hide'} >拼命加载中...</div>*/}
                    {this.resolveTables(rows, columns, selectedRowDetailObj)
                        .map( (item, i) =>{

                            if (!(i % 2)) return (
                                <BaseTable selectedRowDetailObj={selectedRowDetailObj}
                                           onUpdateRow={onUpdateRow}
                                           checkedRows={checkedRows}
                                           checkMode={checkMode}
                                           source={this.identity}
                                           key={i}
                                           rows={item.rows}
                                           columns={item.columns}
                                           hasDetail={item.hasDetail}
                                           onShowDetail={onShowDetail}
                                           onCheckRow={onCheckRow}/>
                            )
                            return (
                                <BaseTable key={i}
                                           rows={item.rows}
                                           columns={item.columns}
                                           isParentTable={false}
                                           source={this.identity}
                                />
                            )
                        })}
                </div>
            </div>
        )
    }
}


/*
 * 内部方法: getCheckedRows
 *
 *
 *
 * */

DataTable.propTypes = {
    columns: React.PropTypes.array,
    rows: React.PropTypes.array,
    checkedRows: React.PropTypes.array,
    searchColumns: React.PropTypes.object,
    checkMode: React.PropTypes.bool,
    hasDetail: React.PropTypes.bool,
    searchBarStatus: React.PropTypes.bool,
    selectedRowDetailObj: React.PropTypes.object
}

DataTable.defaultProps = {
    columns: [],
    rows: [],
    checkedRows: [],
    searchColumns: {},
    selectedRowDetailObj: {},
    searchBarStatus: false,
    hasDetail: false,
    checkMode: false
}