
/**
 * Created by janeluck on 4/7/16.
 */


import { bindActionCreators } from 'redux'
import classNames from 'classnames';
import { connect } from 'react-redux'
import { Row, Col, Input, Icon, Button} from 'antd';
import 'antd/lib/index.css';

const InputGroup = Input.Group;


const SearchInput = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
  },
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <InputGroup className={searchCls} style={this.props.style}>
        <Input {...this.props} value={this.state.value} onChange={this.handleInputChange}
          onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} />
        <div className="ant-input-group-wrap">
          <Button className={btnCls} size={this.props.size} onClick={this.handleSearch}>
            <Icon type="search" />
          </Button>
        </div>
      </InputGroup>
    );
  }
});

class AccountListPage extends React.Component {
    render() {
        return (
            <div  style = {{marginLeft: '20px'}} >
              <Row>
                <Col span="8">
                  <SearchInput placeholder="input search text" style={{ width: 200 }} />
                </Col>
                <Col span="2">
                  <Button type="primary" htmlType="submit">高级搜索</Button>
                </Col>
                <Col span="12">.col-12</Col>
              </Row>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        dataTable: state.components.dataTable,
        account_list: state.business.account_list
    }
}

export default connect(mapStateToProps)(AccountListPage)