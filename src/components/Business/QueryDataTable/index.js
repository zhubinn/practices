/**
 * Created by janeluck on 5/3/16.
 */
// 查询表格
// 依赖Table, Pagination, Form
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Select, Radio, Checkbox,  DatePicker, InputNumber, Cascader  } from 'antd'
import 'antd/style/index.less'
import { isEmpty } from 'lodash'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const InputGroup = Input.Group;

//todo: 清理state方法合并
export default class QueryDataTable extends React.Component {


    static propTypes = {
        columns: React.PropTypes.array,
        showPagination: React.PropTypes.bool,
        loading: React.PropTypes.bool,
        checkMode: React.PropTypes.bool,
        dataSource: React.PropTypes.array,
        pagination: React.PropTypes.object,
        queryColumns: React.PropTypes.object,
        // 刷新数据回调函数
        onGetTableData: React.PropTypes.function
    }

    static defaultProps = {
        checkMode: false,
        columns: [],
        queryColumns: {},
        dataSource: [],
        loading: false,
        onGetTableData: function(){}
    }


    constructor(props) {
        super(props)
        // todo: 默认的列宽度, 有bug ...
        this.defaultColWidth = 200
        this.queryForm = ''

        this.state = {
            isSearchShow: false,
            selectedRowKeys: [],
            expandedRowKeys: [],
            needRenderQuery: true

        }
    }

    clearCheckedAndExpanded = () =>{
        // todo: ???
        setTimeout(()=>{
            this.setState({
                selectedRowKeys: [],
                expandedRowKeys: [],
                isSearchShow: false
            })
        }, 0)

    }

    onSelectChange = (selectedRowKeys)=> {

        this.setState({selectedRowKeys});
    }

  

    // 重置筛选表单数据(供外部调用)
    resetQueryForm = ()=>{
        /*this.setState({
            needRenderQuery: true
        })*/
        this.queryForm = ''
    }
    handleSelectAll = (e, dataSource) => {


        if (e.target.checked) {
            this.setState({
                selectedRowKeys: dataSource.map((item, index) => {
                    return index
                })
            })
        } else {
            this.setState({
                selectedRowKeys: []
            })
        }

    }
    // 获取已经check的row
    getCheckedRows = () => {

        if (!this.props.checkMode) {
            return [];
        }
        return this.props.dataSource.filter((item, i) => this.state.selectedRowKeys.indexOf(i) > -1)

    }



    toggleQueryTable = (e) => {
        this.setState({
            isSearchShow: !this.state.isSearchShow
        })
    }
    renderQueryTable = (columns, queryColumns, checkMode) => {


        if (isEmpty(queryColumns)) return null
        const that = this

        if (!this.queryForm) {
            this.queryForm = React.createClass({
                handleSubmit(e) {
                    e.preventDefault();
                    console.log('收到表单值：', this.props.form.getFieldsValue());
                    const queryFormData = this.props.form.getFieldsValue()
                    ;

                    // that.props.onSure(this.props.form.getFieldsValue())
                    that.clearCheckedAndExpanded()

                    if (that.props.onGetTableData) {
                        that.props.onGetTableData({
                            searchData: Object.keys(this.props.form.getFieldsValue()).map((item)=>{
                                return {
                                    name: item.split('_')[1],
                                    operator: item.split('_')[0],

                                    value: queryFormData[item]

                                }
                            }),
                            page: 1,
                            pageSize: 0,
                            keyword: ''
                        })
                    }
                },
                resetForm(e){
                    this.props.form.resetFields()


                    //this.handleSubmit(e)
                },

                render() {
                    const { getFieldProps } = this.props.form;

                    return (
                        <Form form={this.props.form} style={{display: that.state.isSearchShow ? 'block' : 'none'}}>
                            <table>

                                <tbody className="ant-table-tbody">

                                <tr className="ant-table-row">
                                    {checkMode ? (<td className="ant-table-selection-column"></td>) : null}

                                    {
                                        columns.map((col, i) => (
                                            <td width={col.width || this.defaultColWidth} key={i}>
                                                {that.renderQuery(col, queryColumns, getFieldProps)}
                                            </td>
                                        ))
                                    }
                                </tr>
                                </tbody>
                            </table>
                            <div className="formFooter">
                                <Button type="ghost" onClick={(e) => {this.resetForm(e)}}>重置</Button>
                                <Button type="primary"  onClick={(e) => {this.handleSubmit(e)}}>确定</Button>
                            </div>
                        </Form>






                    );
                }
            });

            this.queryForm = Form.create()(this.queryForm);

        }
        return (<this.queryForm />)


    }

    renderQuery = (col, queryColumns, getFieldProps) => {

        const queryCol = queryColumns[col['key']];

        if (queryCol) {



            switch (queryCol['searchType']) {
             /*   case 3:
                    return (<FormItem >
                        <InputGroup {...getFieldProps('-1_' + col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })}>
                            <Input  />
                            <div className="ant-input-group-wrap">
                                <Select defaultValue=".com" style={{ width: 70 }}>
                                    <Option value=".com">.com</Option>
                                    <Option value=".jp">.jp</Option>
                                    <Option value=".cn">.cn</Option>
                                    <Option value=".org">.org</Option>
                                </Select>
                            </div>
                        </InputGroup>
                    </FormItem>)*/
                case 4:
                case 5:
                case 6:
                case 9:

                    return (<FormItem >
                        <Input {...getFieldProps('19_' + col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)
                case 2:

                    return (<FormItem>
                        <InputNumber {...getFieldProps(col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)

                case 13:

                    return (<FormItem>
                        <Select multiple {...getFieldProps('9_' + col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} >
                            {queryCol['renderData']['options'].map((item, i) =>(<Option value={item.value} key = {i}>{item.text}</Option>)
                            )}
                        </Select>
                    </FormItem>)
                case 15:
                    return (<FormItem>
                        <RangePicker format="yyyy-MM-dd" {...getFieldProps('11_' + col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)
                case 16:
                    return (<FormItem>
                        <RangePicker showTime format="yyyy/MM/dd HH:mm:ss"  showTime  {...getFieldProps('11_' + col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)
                default:
                    return null
            }
        }

        return null
    }

    calculateWidth = ()=> {
        let width = 0
        this.props.checkMode  &&  (width = width + 41)
        this.props.expandedRowRender  &&  (width = width + 34)
        this.props.columns.forEach((item, i) =>{
            width += item.width || this.defaultColWidth
        })

        return width + 'px'
    }




    onExpand(expanded, record) {
        console.log('onExpand', expanded, record);
    }

    onExpandedRowsChange= (rows) => {
        this.setState({
            expandedRowKeys: rows,
        });
    }


    getRowKey(record) {
        return record.ID;
    }

    render() {
        const {dataSource, columns, queryColumns,  current, pageSize, total, checkMode, loading, expandedRowRender} = this.props
        const {isSearchShow, selectedRowKeys} = this.state
        let rowSelection = null
        if (checkMode) {
            rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange
            };
        }

        // 分页
        const pagination = {
            current: current,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (pageNumber) => {
                this.clearCheckedAndExpanded()
                this.props.onGetTableData({
                    keyword: '',
                    page: pageNumber,
                    pageSize: 0

                })
            },
            onShowSizeChange: (current, pageSize) => {
                this.clearCheckedAndExpanded()
                this.props.onGetTableData({
                    keyword: '',
                    pageSize: pageSize,
                    page: 1

                })
            }
        }

        let table = (
            <Table ref='dataTable'
                   dataSource={dataSource}
                   columns={columns.map((item, i) => Object.assign(item, {width: item.width || this.defaultColWidth})
                               )}
                   rowSelection={rowSelection}
                   pagination={false}
                   showHeader={false}
                   loading={loading}
            >
            </Table>
        )
        if (this.props.expandedRowRender) {
            table = (<Table ref='dataTable'
                           dataSource={dataSource}
                           columns={columns.map((item, i) => Object.assign(item, {width: item.width || this.defaultColWidth})
                               )}
                           rowSelection={rowSelection}
                           pagination={false}
                           showHeader={false}
                           loading={loading}

                           expandIconAsCell
                           expandedRowRender={this.props.expandedRowRender}
                           expandedRowKeys={this.state.expandedRowKeys}
                           onExpandedRowsChange={this.onExpandedRowsChange}
                           onExpand={this.onExpand}
                           rowKey={this.getRowKey}
            >
            </Table>)
        }



        return (

            <div>

                <div style={{width: '800px', height: '500px',  overflow: "auto"}}>
                    <div style={{width: this.calculateWidth()}}>


                    <div className="ant-noneWe">
                        <div className="ant-table ant-table-large"
                             onSubmit={this.handleSubmit }>
                            <div className="ant-table-body">

                                    <table>
                                        <thead className="ant-table-thead">
                                        <tr>
                                            {checkMode ?
                                                (<th className="ant-table-selection-column">
                                                    <Checkbox
                                                        ref="SelectAll"
                                                        checked={ !!dataSource.length && this.state.selectedRowKeys.length === dataSource.length }
                                                        onChange={
                                                            (e)=>{this.handleSelectAll(e, dataSource)}}/></th>) : null }
                                            {this.props.expandedRowRender ? (<th style={{width: 34}}></th>): null}
                                            {
                                                columns.map((col, i) => <th key={i} width={col.width||this.defaultColWidth}>{col.title}</th>)
                                            }
                                        </tr>
                                        </thead>
                                    </table>

                                    {/*搜索部分*/}
                                    {this.renderQueryTable(columns, queryColumns, checkMode)}




                            </div>

                        </div>
                        </div>


                        {table}
                    </div>

                </div>

                <Pagination  {...pagination}/>
            </div>
        )
    }
}