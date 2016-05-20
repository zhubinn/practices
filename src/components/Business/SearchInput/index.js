/**
 * Created by janeluck on 4/27/16.
 */
import {Button, Icon, Input } from 'antd'
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
            this.props.onSearch(this.state.value);

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
                        <Icon type="search"/>
                    </Button>
                </div>
            </InputGroup>
        );
    }
});
export default SearchInput