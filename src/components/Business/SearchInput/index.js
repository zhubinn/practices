
/**
 * Created by ytm on 4/7/16.
 */
import classNames from 'classnames';
import {Input, Icon, Button} from 'antd';

const InputGroup = Input.Group;


export default class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFocusBlur = this.handleFocusBlur.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = {
      focus: false,
    };
  }

  handleInputChange(e) {
    this.props.handleInputChange(e.target.value);
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  handleSearch() {
    let val = this.props.val;
    if (this.props.onSearch) {
      this.props.onSearch(val);
    }
  }

  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.props.val.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    return (
      <InputGroup className={searchCls} style={this.props.style}>
        <Input {...this.props} value={this.props.val} onChange={this.handleInputChange}
          onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} />
        <div className="ant-input-group-wrap">
          <Button className={btnCls} size={this.props.size} onClick={this.handleSearch}>
            <Icon type="search" />
          </Button>
        </div>
      </InputGroup>
    );
  }
}