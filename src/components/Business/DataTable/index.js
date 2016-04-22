/**
 * Created by janeluck on 4/6/16.
 */

import { findDOMNode } from 'react-dom'
import { isPlainObject, isFunction, isString, isArray } from 'lodash'
import fetch from 'isomorphic-fetch'
import randomString  from 'random-string'
import BaseTable from './BaseTable'

import './base.css'
import './DataTable.less'


import {  Spin, InputNumber, Input, DatePicker, Select, Form, Button  } from 'antd';
import 'antd/lib/index.css';


// todo: 获取数据action的详写
import {secondRowsData, secondColumns} from 'components/Business/DataTable/fakeData'


const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
let SearchBar




let Demo = React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    },

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormItem
                    label="账户：">
                    <Input placeholder="请输入账户名"
                        {...getFieldProps('userName')} />
                </FormItem>
                <FormItem
                    label="密码：">
                    <Input type="password" placeholder="请输入密码"
                        {...getFieldProps('password')} />
                </FormItem>

                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
        );
    }
});

Demo = Form.create()(Demo);


export default class DataTable extends React.Component {
    constructor(props) {
        super(props)


        this.resolveTables = this.resolveTables.bind(this)
        this.renderCheckBtn = this.renderCheckBtn.bind(this)
        this.renderTitleCell = this.renderTitleCell.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
        this.createSearchBar = this.createSearchBar.bind(this)
        this.getCheckedRows = this.getCheckedRows.bind(this)
        this.getCheckedIndexes = this.getCheckedIndexes.bind(this)
        this.getSearchForm = this.getSearchForm.bind(this)
        this.renderLoading = this.renderLoading.bind(this)
        this.identity = 'dataTable_' + randomString()


        const that = this
        // searchUrl不为空字符串, 获取高级搜索所需要的数据
        if (this.props.searchUrl) {
            fetch(this.props.searchUrl, {

                method: 'post',
                headers: {
                    'API': 1,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            }).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server")
                }
                return response.json()
            }).then(function (data) {

                that.searchColumns1 = data.searchColumns1
                that.searchColumns2 = data.searchColumns2

            })
        }



    }



    componentDidMount(){


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
        this.props.onCheckRow(-1, !(this.props.rows.length === this.props.checkedRows.length), this.identity)
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

      //  console.log(this.refs.searchForm)




      //  console.log(Array.prototype.forEach.call(document.querySelectorAll('[name^=search-]'), function(item){console.log(item.querySelectorAll('input'))}))

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


    renderSearch(datafield, getFieldProps) {
        if (!this.searchColumns1) return null
        let obj = this.searchColumns1[datafield];

        if (typeof obj === 'undefined') return null

        // todo: 拆分
        switch (obj.searchType || 0) {
            case 1:

                return (<FormItem  ><Input {...getFieldProps(datafield)}  /></FormItem>)
            case 2:
                return (<FormItem><InputNumber {...getFieldProps(datafield)} /></FormItem>)
            case 3:
                return (
                    <FormItem  ><DatePicker format="yyyyMMdd" {...getFieldProps(datafield, {initialValue: obj.renderData.defaultValue})}  /></FormItem>)
            case 4:
                return (<FormItem  >

                    <Select   {...getFieldProps(datafield, {initialValue: obj.renderData.defaultValue})}  >

                        {obj.renderData.options.map((item, i) => (
                            <Option key={i} value={item.value}>{item.text}</Option>))}


                    </Select>


                </FormItem>)
            case 5:
                return (<FormItem  >
                    <RangePicker {...getFieldProps(datafield, {initialValue: obj.renderData.defaultValue})}
                        format="yyyyMMdd"/>


                </FormItem>)

        }
        return null
    }


    createSearchBar(checkMode, hasDetail, columns) {
        const that = this

        if(!SearchBar ){
        SearchBar = React.createClass({
            handleSubmit(e) {
                e.preventDefault();
                console.log('收到表单值：', this.props.form.getFieldsValue());
                 //that.props.toggleSearch(false, that.identity)
                 that.props.onSure(this.props.form.getFieldsValue())
            },
            resetForm(){
                this.props.form.resetFields()
            },

            render() {
                const { getFieldProps } = this.props.form;

                return (
                    <Form inline onSubmit={this.handleSubmit}>
                        <table >
                            <tbody>
                            <tr >
                                {checkMode ? (<td>
                                    <div className="small-cell"></div>
                                </td>) : null}


                                {hasDetail ? (<td>
                                    <div className="small-cell"></div>
                                </td>) : null}

                                {columns.map((item, i) => (<td key={i}>

                                    <div
                                        style={{width: ''+ (item.width||150) +'px'}}>


                                        {that.renderSearch(item.datafield, getFieldProps)}


                                    </div>
                                </td>))}

                            </tr>
                            </tbody>


                        </table>
                        <div className="formFooter">
                            <Button type="ghost" onClick={(e) => {this.resetForm()}}>重置</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </div>

                    </Form>
                );
            }
        });

        SearchBar = Form.create()(SearchBar);
        }
        return (<SearchBar />)
    }

    renderLoading(pending) {
        return pending ? (<Spin />) : null
    }


    render() {

        const {
            rows,
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

                        { /*    <Form  >
                         <table className={searchBarStatus ? '' : 'hide'}>
                         <tbody>
                         <tr >
                         {checkMode ? (<td>
                         <div className="small-cell"></div>
                         </td>) : null}


                         {hasDetail ? (<td>
                         <div className="small-cell"></div>
                         </td>) : null}


                         {columns.map((item, i) => (<td key={i}>

                         <div
                         style={{width: ''+ (item.width||150) +'px'}}>


                         {this.renderSearch(item.datafield)}


                         </div>
                         </td>))}

                         </tr>
                         <tr>
                         <td><Button type="ghost"  > 重置</Button></td>
                         <td><Button htmlType="submit" type="primary" onClick = {(e)=>{this.getSearchForm()}}> 确定</Button></td>
                         </tr>
                         </tbody>

                         </table>

                         </Form>*/}


                        <div className={searchBarStatus ? '' : 'hide'}>
                            {this.createSearchBar(checkMode, hasDetail, columns)}
                        </div>

                    </div>

                    {/*    <div className={pending ? '' : 'hide'} >拼命加载中...</div>*/}
                    {
                        this.renderLoading(pending)
                    }

                    {this.resolveTables(rows, columns, selectedRowDetailObj)
                        .map((item, i) => {

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
 *searchUrl: 获得searchColumns的url, 如果不为空字符串, 先获取数据
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
    searchUrl: React.PropTypes.string,
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
    checkMode: false,
    searchUrl: ''
}