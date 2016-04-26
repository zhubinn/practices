
/**
 * Created by ytm on 4/7/16.
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Row, Col, Table, Radio, Button, Input, Pagination, Modal} from 'antd'
import {handleInputChange, getFuncLogData, pageSizeChange}  from 'actions/business/Log/FunctionLog'
import 'antd/lib/index.css'

let DataLogParams = {
    url: 'http://esn.yangtianming.com/front/js/scrm/fakeData/funcLog.php',
    data: {
        page: 1,
        pageSize: 10
    }
}

class FunctionLog extends React.Component {
    constructor(props) {
      super(props)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.exportConfirm = this.exportConfirm.bind(this)
      this.searchTimer;
      this.state = {};
    }

    componentDidMount() {
      this.props.getFuncLogData(DataLogParams);
    }

    handleInputChange() {
      let val = this.refs.seachVal.getDOMNode().value;
      alert(val)
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => { this.props.getFuncLogData(DataLogParams) }, 300);
    }

    onShowSizeChange(current, pageSize) {
      DataLogParams.data.page = current;
      DataLogParams.data.pageSize = pageSize;
      this.props.pageSizeChange({current, pageSize});
    }

    pageOnChange(page){
      DataLogParams.data.page = page;
      this.props.getFuncLogData(DataLogParams);
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

    handleChange(){
      flag = true
      const IsMultiselect = 0;
      this.props.changeIsMultiselect(IsMultiselect)
      this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
    }

    showfilter() {
      flag = true;
      const IsMultiselect = 1;
      this.props.changeIsMultiselect(IsMultiselect)
      this.props.getPeopleData(selectPeopleParams, DATA_SELECTPEOPLE_SOURCE)
    }

    render() {
        const { $$funcLogState } = this.props;

        const dataSource = $$funcLogState.get('dataResult').get('data').toJS();

        const columns = $$funcLogState.get('dataResult').get('columns').toJS();

        const pageSize = $$funcLogState.get('pageData').get('pageSize');

        
        //分页配置
        const pagination = {
          total: dataSource.length,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize:pageSize,
          onShowSizeChange: this.onShowSizeChange.bind(this),
          onChange: this.pageOnChange.bind(this),
          showTotal: this.showPageTotal
        };

        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="16">
                  <input placeholder="请输入.." className="Hightsearch_input" style={{ width: 220 }} ref = "seachVal"/>
                  <Button type="primary" onClick = {this.handleInputChange}>搜索</Button>
                </Col>
                <Col span="6">
                  <Button type="primary" style = {{marginRight: '10px'}}  onClick = {this.showfilter.bind(this)}>筛选</Button>
                  <Button type="ghost" onClick = {this.exportConfirm}>导出EXCEL</Button>
                </Col>
              </Row>
              <Table dataSource={dataSource} columns={columns} pagination={pagination}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      $$funcLogState: state.business.FuncLog
    }
}

export default connect(mapStateToProps, {
    getFuncLogData,
    handleInputChange,
    pageSizeChange
})(FunctionLog)