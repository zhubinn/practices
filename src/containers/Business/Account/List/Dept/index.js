/**
 * Created by janeluck on 4/27/16.
 */
import { connect } from 'react-redux'
import {Button, Icon, Input, Row, Col, Tabs, Table, Pagination, Form, Modal  } from 'antd'
import 'antd/style/index.less'
import SearchInput from 'components/Business/SearchInput'
import { getTableData, getTableQuery } from 'actions/business/account/list/dept'
import { isEmpty } from 'lodash'
import QueryDataTable from 'components/Business/QueryDataTable'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

/*地图弹出层*/
const showMap = function (lng, lat) {


    Modal.info({
        content: (
            <div id="bdMap" style={{width: 800, height: 500, marginLeft: -34, marginTop: 20}}>
            </div>
        ),
        width: 884,
        okText: '关闭',
        title: '客户地理坐标'
    });


    // 百度地图API功能
    var msg = '';
    var map = new BMap.Map("bdMap");
    var point = new BMap.Point(lng, lat);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    map.centerAndZoom(point, 12);
    var geoc = new BMap.Geocoder();
    var opts = {
        width: 200, // 信息窗口宽度
        height: 60, // 信息窗口高度

        title: "", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: ''
    };

    // 逆地址解析
    geoc.getLocation(point, function (result) {
        if (result) {
            //alert(result.address);
            var infoWindow = new BMap.InfoWindow("地址：" + result.address, opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        }
    });


    marker.addEventListener("click", function (e) {
        var pt = e.point;
        geoc.getLocation(pt, function (rs) {
            // console.log(rs);
            var addComp = rs.addressComponents;
            msg = addComp.province + addComp.city + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
            var infoWindow = new BMap.InfoWindow(msg, opts); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口

        });

    });


    var bottom_right_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});// 添加比例尺
    var bottom_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});  // 添加默认缩放平移控件
    /*缩放控件type有四种类型:
     BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

    //添加控件和比例尺

    map.addControl(bottom_right_control);
    map.addControl(bottom_right_navigation);


};
// SCRM.url 由原来外层页面引入

const columns = [{
    title: '客户名称',
    dataIndex: 'Name',
    key: 'Name',

}, {
    title: '简称',
    dataIndex: 'ShortName',
    key: 'ShortName',

}, {
    title: '开户银行',
    dataIndex: 'Bank',
    key: 'Bank',

}, {
    title: '银行账号',
    dataIndex: 'BankAccount',
    key: 'BankAccount',

}, {
    title: '负责人',
    dataIndex: 'OwnerID',
    key: 'OwnerID',

}, {
    title: '客户公司地址',
    dataIndex: 'Address',
    key: 'Address',

}, {
    title: '销售地址',
    dataIndex: 'Address2',
    key: 'Address2',

}, {
    title: '工厂地址',
    dataIndex: 'Address3',
    key: 'Address3',

}, {
    title: '库房地址',
    dataIndex: 'Address4',
    key: 'Address4',

}, {
    title: '收货地址',
    dataIndex: 'Address5',
    key: 'Address5',

}, {
    title: '门店地址',
    dataIndex: 'Address6',
    key: 'Address6',

}, {
    title: '其他地址',
    dataIndex: 'Address7',
    key: 'Address7',

}, {
    title: '客户地理坐标',
    dataIndex: 'ID',
    key: 'ID',
    render: function (text, record, index) {
        let cell = (<p>未设置</p>)
        if (!!record.Lat) {
            cell = (<a href="javascript:;" onClick={()=>{showMap(record.Lng, record.Lat)}}>已设置</a>)
        }
        return cell
    }

}, {
    title: '客户公司电话',
    dataIndex: 'Phone',
    key: 'Phone',

}, {
    title: '销售电话',
    dataIndex: 'Phone2',
    key: 'Phone2',

}, {
    title: '工厂电话',
    dataIndex: 'Phone3',
    key: 'Phone3',

}, {
    title: '库房电话',
    dataIndex: 'Phone4',
    key: 'Phone4',

}, {
    title: '收货电话',
    dataIndex: 'Phone5',
    key: 'Phone5',

}, {
    title: '门店电话',
    dataIndex: 'Phone6',
    key: 'Phone6',

}, {
    title: '其他电话',
    dataIndex: 'Phone7',
    key: 'Phone7',

}, {
    title: '客户简介',
    dataIndex: 'Descriptions',
    key: 'Descriptions',

}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',

}, {
    title: '主营产品',
    dataIndex: 'MainProduct',
    key: 'MainProduct',

}, {
    title: '客户规模',
    dataIndex: 'Scale',
    key: 'Scale',

}, {
    title: '客户级别',
    dataIndex: 'AccountLevel',
    key: 'AccountLevel',

}, {
    title: '业务类型',
    dataIndex: 'AccountIndustry',
    key: 'AccountIndustry',

}, {
    title: '所属区域',
    dataIndex: 'Area',
    key: 'Area',

}, {
    title: '客户公司网址',
    dataIndex: 'WebSite',
    key: 'WebSite',

}, {
    title: '旺旺',
    dataIndex: 'Ww',
    key: 'Ww',

}, {
    title: 'MSN/QQ',
    dataIndex: 'Msnqq',
    key: 'Msnqq',

}, {
    title: '电子邮件',
    dataIndex: 'Email',
    key: 'Email',

}, {
    title: '客户联系人',
    dataIndex: 'AccountConnect',
    key: 'AccountConnect',

}, {
    title: '备注',
    dataIndex: 'Beizhu',
    key: 'Beizhu',

}, {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    key: 'CreatedTime',

}];

// 查询表格
// 依赖Table, Pagination, Form


class Account_List_Dept_Page extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        // todo: url包装
        this.props.getTableData({

            url: SCRM.url('/scrmweb/accounts/getList')
        })
        this.props.getTableQuery(SCRM.url('/scrmweb/accounts/getAccountFilter'))
    }

    // 普通搜索和筛选(高级搜索)互斥
    normalSearch = (value) => {
        // 重置筛选(高级搜索)
        this.refs.queryDataTable.resetQueryForm()

        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getTableData({
            data: {
                searchData: [],
                keyword: value,
                page: 1,
                pageSize: 0
            }
        })


    }
    changeType = (type) => {
        // 重置筛选(高级搜索)
        this.refs.searchInput.emptyInput()
        this.refs.queryDataTable.resetQueryForm()
        this.refs.queryDataTable.clearCheckedAndExpanded()
        this.props.getTableData({
            data: {
                searchData: [],
                keyword: '',
                page: 1,
                pageSize: 0,
                type
            }
        })

    }
    changeOwner = (e) => {
        console.log('获取已经选择的row')
        console.log(this.refs.queryDataTable.getCheckedRows())

    }

    render() {
        const {
            $$account_list_dept,
            getTableData

            } = this.props

        let queryDataTable = {}
        queryDataTable.dataSource = $$account_list_dept.toJS().rows
        queryDataTable.current = $$account_list_dept.toJS().current
        queryDataTable.total = $$account_list_dept.toJS().total
        queryDataTable.pageSize = $$account_list_dept.toJS().pageSize
        queryDataTable.queryColumns = $$account_list_dept.toJS().queryColumns
        queryDataTable.loading = $$account_list_dept.toJS().loading
        return (
            <div>
                <Row>
                    <Col span="8"><SearchInput ref="searchInput" onSearch={(value)=>{this.normalSearch(value)}}/> </Col>

                    <Col span="8" offset="8">
                        <Button type="primary" onClick={(e)=>{
                            this.refs.queryDataTable.toggleQueryTable(e)
                        }}>筛选</Button>
                        <Button type="ghost" onClick={(e) => {this.changeOwner(e)}}>变更联系人</Button>
                        <Button type="ghost">导出</Button>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="all"
                      type="card"
                      onChange={i => {this.changeType(i)}}>
                    <TabPane tab="全部客户" key="all">
                    </TabPane>
                    <TabPane tab="负责的客户" key="owner">
                    </TabPane>
                    <TabPane tab="重点客户" key="important">
                    </TabPane>
                    <TabPane tab="关注的客户" key="follow">
                    </TabPane>
                </Tabs>


                <QueryDataTable
                    columns={columns}
                    checkMode={true}
                    {...queryDataTable}
                    onGetTableData={

                                (obj)=>{
                                    getTableData({
                                        data: obj
                                    })
                                }
                            }
                    ref="queryDataTable"
                >
                </QueryDataTable>


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$account_list_dept: state.business.account_list_dept
    }
}

export default connect(mapStateToProps, {
    getTableData,
    getTableQuery
})(Account_List_Dept_Page)