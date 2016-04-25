/**
 * Created by fuwenfang on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import basic from './css/basic_new_v2.css'
//import Statistic from './css/Statistic.less'

import DataTable from 'components/Business/DataTable'

import {getAccountDetailData,changeInputVal} from 'actions/Business/Account/Detail'

import { Table, Icon } from 'antd';

let detailColumns = [

    {title: '部门名称', dataIndex: 'Name',key: 'Name', width: 120},
    {title: '员工姓名', dataIndex: 'user',key: 'user', width: 70,render: function(text, record, index){
        return (
          <a href = "#" title = {text}>{text}</a>
          );
    }},
    {title: '全部客户数量', dataIndex: 'All', key: 'All',width: 120},
    {title: '负责的客户数量', dataIndex: 'Owner',key: 'Owner', width: 120},
    {title: '参与的客户数量', dataIndex: 'Relation', key: 'Relation',width: 120},
    {title: '重点客户数量', dataIndex: 'Focus', key: 'Focus',width: 120}
];



/*需要根据权限判断是否角色 不同角色一级穿透明细统计表不同columns
普通员工不变，领导以及负责人与上一级不同
*/
//假定角色  0 领导以及部门负责人；1 普通员工 
const role = 1


/*统计页面的请求接口*/
let detailParams = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}


class AccountDetail extends React.Component{
  constructor(props) {
        super(props)
    }
  componentDidMount() {
      // 页面初始完,获取统计数据,触发action: GET_DATA
      this.props.getAccountDetailData(detailParams)
  }
  handleOnChange(e){
      const textValue = e.currentTarget.value;
      const {changeInputVal} = this.props
      changeInputVal(textValue)
    }
  handleClickSearch(e){
    const textValue = this.props.$$account_statistic.toJS().value
    //TODO 用keyword拿数据

  }

  render(){
          const rowData = this.props.$$account_detail.toJS().rowData
          return (
            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch">
                         <input type="text" className="Hightsearch_input" onChange = {this.handleOnChange.bind(this)}/>
                         <button onClick = {this.handleClickSearch.bind(this)}>搜索</button>
                     </div>
                     <button className="col_cktop-btnFpai">导出EXCEL</button>
                  </div>  
                </div>
                <Table ref = "dataTable"
                 columns={detailColumns} 
                 dataSource={rowData} 
                 useFixedHeader 
                 pagination = {false}
                />
            </div>
          )
        }
  
}

const mapStateToProps = (state, ownProps) => {

    return {
        $$account_detail: state.business.account_detail,
    }
}

export default connect(mapStateToProps, {
  getAccountDetailData,
  changeInputVal,
})(AccountDetail)