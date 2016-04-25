
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Button, Input, Pagination, Modal} from 'antd'
import DataTable from 'components/Business/DataTable'
import {rowsData, columns, searchColumns} from 'components/Business/DataTable/fakeData'
import  { initSource,getData, showDetail, checkRow, updateRow, toggleSearch}  from 'actions/Component/DataTable'
import {handleInputChange, getReportData}  from 'actions/business/Log/DataLog'
import 'antd/lib/index.css'

let params = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/tableData.php',
    data: {
        page: 1,
        rowsPerPage: 20
    }
}

class DataLog extends React.Component {
    constructor(props) {
      super(props)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.exportConfirm = this.exportConfirm.bind(this)
      this.searchTimer;
      this.state = { 
        visible: false 
      };
    }

    componentDidMount() {
      const id = this.refs.dataTable.identity
      this.props.initSource(id)
      this.props.getData(params, id)
    }

    handleInputChange() {
      let val = this.refs.seachVal.getDOMNode().value;
      const { getData } = this.props;
      const id = this.refs.dataTable.identity;

      // clearTimeout(this.searchTimer)
      // this.searchTimer = setTimeout(() => { getData(params, id) }, 500);

      getData(params, id)
    }

    onShowSizeChange(current, pageSize) {
      alert(current, pageSize);
      const id = this.refs.dataTable.identity
      this.props.getData(params, id)
    }

    pageOnChange(page){
      alert(page);
      const id = this.refs.dataTable.identity
      this.props.getData(params, id)
    }

    showPageTotal(total){
      return `共 ${total} 条`;
    }

    exportConfirm() {
      Modal.confirm({
        title: '您是否确认导出？',
        content: '导出Excel表。',
        onOk() {
          console.log('确定');
        },
        onCancel() {}
      });
    }

    render() {
        const { $$searchState} = this.props;
        let seachVal = $$searchState.get('seachVal') || '';
     
        const { showDetail, checkRow, updateRow, toggleSearch} = this.props

        let dataSource = {}

        if (this.refs.dataTable) {
            const { $$dataTable } = this.props

            const $$obj = $$dataTable.get(this.refs.dataTable.identity)

            if ($$obj) {
                dataSource = $$obj.toJS()
            }
        }

        let that = this;
        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="9">
                  <input placeholder="请输入..." className="Hightsearch_input" style={{ width: 220 }} ref = "seachVal"/>
                  <Button type="primary" onClick = {this.handleInputChange}>搜索</Button>
                </Col>
                <Col span="10">
                  <Button type="primary"  onClick={(e) => {toggleSearch(!dataSource.searchBarShow, this.refs.dataTable.identity )}} style={{ marginLeft: 10 }} >{dataSource.searchBarShow ? "隐藏搜索" : "高级搜索"}</Button>
                </Col>
                <Col span="4">
                  <Button type="ghost" onClick = {this.exportConfirm}>导出EXCEL</Button>
                </Col>
              </Row>
              <DataTable ref="dataTable"
                           checkMode={false}
                           onCheckRow={checkRow}
                           hasDetail={false}
                           checkedRows={dataSource.checkedRows}
                           rows={dataSource.rows}
                           selectedRowDetailObj={dataSource.selectedRowDetailObj}
                           searchColumns={searchColumns}
                           columns={columns}
                           searchBarStatus={dataSource.searchBarShow}
                           onUpdateRow={updateRow}
                           onShowDetail={showDetail}
                           toggleSearch={toggleSearch}
                           pending={dataSource.pending}
                />
             <Pagination 
                  showSizeChanger 
                  showQuickJumper 
                  total={54} 
                  onShowSizeChange = {this.onShowSizeChange}
                  onChange={this.pageOnChange}
                  showTotal={this.showPageTotal} 
                /> 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$searchState: state.business.statistic,
        $$dataTable: state.components.dataTable
    }
}

export default connect(mapStateToProps, {
    getReportData,
    handleInputChange,
    initSource,
    getData,
    showDetail,
    checkRow,
    updateRow,
    toggleSearch,
})(DataLog)