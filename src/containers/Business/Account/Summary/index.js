/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import basic from './css/basic_new_v2.css'
import Summary from './css/Summary.less'



import DataTable from 'components/Business/DataTable'
import  { initSource,getData}  from 'actions/Component/DataTable'

import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'

import {searchKeyWord} from 'actions/Business/Account/Summary'



let summaryColumns = [

    {text: '部门名称', datafield: 'name', width: 120,cellsrenderer: function(rowData, column, value){
        return (
          <a  title = {value}>{value}</a>
          );
      
    }},
    {text: '全部客户数量', datafield: 'user', width: 160},
    {text: '全部生意数量', datafield: 'date', width: 160},
    {text: '全部预计销售金额', datafield: 'NpStopTime',width:160},
    {text: '全部成交金额', datafield: 'ID', width: 160},
    {text: '全部汇款金额', datafield: 'IsSys', width: 160},
    {text: '全部输单金额', datafield: 'IsSys', width: 160}
];

let params = {
    url: 'http://esn.fuwenfang.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}


class AccountSummaryPage extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        const id = this.refs.dataTable.identity
        this.props.initSource(id)
        //// 页面初始完,获取数据,触发action: GET_DATA
        this.props.getData(params, id)

    }
    handleKeyUp(e){
    const textValue = e.currentTarget.value;
      let that = e.target;
      clearTimeout(that.timer);

      that.timer = setTimeout(
          function()
          {
              delete that.timer;
              // why delete? it is about high performance?
            const {searchKeyWord} = this.props
            searchKeyWord(textValue)
          }.bind(this),
          500
      );
      
  }

    render() {
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props

        let dataSource = {}

        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable.identity)

            if ($$obj) {
                dataSource = $$obj.toJS()
            }
        }

        return (


            <div style={{marginLeft: '20px'}}>
                <div className = "col_cktop">
                  <div className="col_cktop-gongneng clearfix">
                     <div className="col_cktop-Hightsearch"><input type="text" className="Hightsearch_input" onKeyUp = {this.handleKeyUp.bind(this)}/><button className="Hightsearch-btn">高级搜索</button></div>
                     <button className="col_cktop-btnFpai">导出EXCEL</button>
                  </div>  
                </div>


               <DataTable ref="dataTable"
                           checkMode={false}
                           hasDetail={false}
                           rows={dataSource.rows}
                           searchColumns={searchColumns}
                           columns={summaryColumns}
                           pending={dataSource.pending}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$dataTable: state.components.dataTable,
        account_list: state.business.account_list
    }
}

export default connect(mapStateToProps, {
    initSource,
    getData,
    searchKeyWord,
})(AccountSummaryPage)