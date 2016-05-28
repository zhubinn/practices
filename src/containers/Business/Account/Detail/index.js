/**
 * Created by janeluck on 4/25/16.
 */

import { connect } from 'react-redux'
import { Breadcrumb, Button, Icon, Input, Row, Col } from 'antd'
import QueryNestedTable from 'components/QueryNestedTable'
import INPUTTYPE from 'components/QueryNestedTable/inputType'
import {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
} from 'actions/business/account/detail'
import {
    toggleQueryPanel,
} from 'actions/components/QueryNestedTable'






/*普通搜索*/

import classNames from 'classnames';
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
    // 支持enter键触发搜索
    handleKeyup(e){
        if (e.keyCode == 13) {
            this.handleSearch()
        }
    },

    // 清空
    emptyInput(){
        this.setState({
            value: ''
        });
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
                                       onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur}
                                       onKeyUp={this.handleKeyup}

                />
                <div className="ant-input-group-wrap">
                    <Button className={btnCls} size={this.props.size} onClick={this.handleSearch}>
                        <Icon type="search" />
                    </Button>
                </div>
            </InputGroup>
        );
    }
});








class Account_Detail_Page extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {
            $$QueryNestedTable,
            initQueryNestedTable,
            updateDataSource,
            updateChildDataSource,
            toggleQueryPanel,
            } = this.props

        return (
            <div>

                <Row>
                    <Col span="8"> <SearchInput placeholder="请输入搜索内容" style={{ width: 200 }} /></Col>
                    <Col span="8" offset="8">


                            <Button type="primary" onClick={toggleQueryPanel}>筛选</Button>

                            <Button type="ghost">变更联系人</Button>
                            <Button type="ghost">导出</Button>

                        </Col>
                </Row>

                <QueryNestedTable
                    init={initQueryNestedTable}
                    updateDataSource={updateDataSource}
                    updateChildDataSource={updateChildDataSource}

                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        $$QueryNestedTable: state.components.QueryNestedTable,
        $$account_detail: state.business.account_detail
    }
}

export default connect(mapStateToProps, {
    initQueryNestedTable,
    updateDataSource,
    updateChildDataSource,
    toggleQueryPanel,
})(Account_Detail_Page)
