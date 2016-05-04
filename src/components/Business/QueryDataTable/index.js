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
        loading: false
    }


    constructor(props) {
        super(props)
        // todo: 默认的列宽度, 有bug ...
        this.defaultColWidth = 200
        this.queryForm = ''

        this.state = {
            isSearchShow: false,
            selectedRowKeys: []

        }
    }

    onSelectChange = (selectedRowKeys)=> {

        this.setState({selectedRowKeys});
    }

    clearSelectedRows = () => {
        this.setState({
            selectedRowKeys: []
        })
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

                    // that.props.onSure(this.props.form.getFieldsValue())
                    that.setState({
                        isSearchShow: false,
                        selectedRowKeys: []
                    })


                    if (that.props.onGetTableData) {
                        that.props.onGetTableData({
                            searchData: this.props.form.getFieldsValue(),
                            page: 1
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

                case 1:

                    return (<FormItem>
                        <Input {...getFieldProps(col['key'], {
                            initialValue: queryCol['renderData']['defaultValue']
                        })} />
                    </FormItem>)
                case 2:

                    return (<FormItem>
                        <InputNumber {...getFieldProps(col['key'], {
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
        this.props.columns.forEach((item, i) =>{
            width += item.width || this.defaultColWidth
        })

        return width + 'px'
    }
    render() {
        const {dataSource, columns, queryColumns,  current, pageSize, total, checkMode, loading} = this.props
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
                this.clearSelectedRows()
                this.props.onGetTableData({

                    page: pageNumber,
                    pageSize: 0

                })
            },
            onShowSizeChange: (current, pageSize) => {
                this.clearSelectedRows()
                this.props.onGetTableData({

                    pageSize: pageSize,
                    page: 1

                })
            }
        }


        return (

            <div>

                <div style={{width: '800px', height: '500px',  overflow: "auto"}}>
                    <div style={{width: this.calculateWidth()}}>



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
                                                        checked={ this.state.selectedRowKeys.length === dataSource.length }
                                                        onChange={
                                                            (e)=>{this.handleSelectAll(e, dataSource)}}/></th>) : null }

                                            {
                                                columns.map(col => <th width={col.width||this.defaultColWidth}>{col.title}</th>)
                                            }
                                        </tr>
                                        </thead>
                                    </table>

                                    {/*搜索部分*/}
                                    {this.renderQueryTable(columns, queryColumns, checkMode)}




                            </div>

                        </div>


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
                    </div>

                </div>

                <Pagination  {...pagination}/>
            </div>
        )
    }
}