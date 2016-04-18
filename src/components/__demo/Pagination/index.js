/**
 * Created by yangtm
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'
import fillItemsList from './fillItemsList'
import './pagination.css'

let items, preDisabled, nextDisabled;

class PageGo extends React.Component {
  constructor() {
    super()
    this.GOFn = this.GOFn.bind(this)
  }
  GOFn() {
    let inputPage = this.refs.iptPage;
    let pageIndex = inputPage.getDOMNode().value
    let pageCount = Math.ceil(this.props.total/this.props.pageSize);
    if (pageIndex > pageCount || pageIndex < 1 ) {
      alert("这个数字跳不动！");
      inputPage.focus();
      return;
    } else if (isNaN(pageIndex)) {
      alert("注意眼神了！ 请输入数字");
      inputPage.getDOMNode().value = "";
      inputPage.focus();
      return;
    }
    pageIndex = parseInt(pageIndex);
    this.props.GOFn(pageIndex);
  }
  render() {
    return ( 
      <div className="go-page-box">
        跳到 <input className = "inputPage" type = "input" ref = "iptPage"/> 页 
        {" "} 
        < button className="goPage" onClick={this.GOFn}>跳转< /button>
      </div>
    )
  }
}

class Pagination extends React.Component {
  constructor() {
    super();
    this.changePageSize = this.changePageSize.bind(this);
    this.GOFn = this.GOFn.bind(this);
    this.preFn = this.preFn.bind(this);
    this.nextFn = this.nextFn.bind(this);
    this.indexFn = this.indexFn.bind(this);
  }
  componentWillUpdate() {
    let pageCount = Math.ceil(this.props.total/this.props.pageSize);
    items = fillItemsList(this.props.current, pageCount);
  }
  changePageSize(e) {
    let pageIndex = 1;
    let pageSize = parseInt( e.target.value )
    let pageCount = Math.ceil( this.props.total / pageSize );
    items = fillItemsList( this.props.current, pageCount);
    this.props.pageChangeFn( pageIndex, pageSize);
  }
  preFn() {
    let pageIndex = this.props.current;
    let pageSize = this.props.pageSize;
    let pageCount = Math.ceil(this.props.total/pageSize);
    pageIndex -= 1;
    if ( pageIndex < 1 ) { return; }
    this.props.pageChangeFn(pageIndex, pageSize);
  }
  nextFn() {
    let pageIndex = this.props.current;
    let pageSize = this.props.pageSize;
    let pageCount = Math.ceil(this.props.total/pageSize);
    pageIndex += 1;
    if ( pageIndex > pageCount ) { return; }
    this.props.pageChangeFn(pageIndex, pageSize);
  }
  indexFn(pageIndex) {
    let pageSize = this.props.pageSize;
    this.props.pageChangeFn(pageIndex, pageSize);
  }
  GOFn(pageIndex) {
    let pageSize = this.props.pageSize;
    this.props.pageChangeFn(pageIndex, pageSize);
  }
  componentDidMount() {
     let inputPage = this.refs.iptPage;
     let pageSize = this.props.pageSize;
     $(inputPage).find("option:contains('"+pageSize+"')").prop("selected", true);
  }
  render() {
    let pageCount = Math.ceil(this.props.total/this.props.pageSize);
    items = fillItemsList(this.props.current, pageCount)

    const createItem = (itemText, i) => {
      if (itemText.className == "ellipsis" || itemText.className == "current") {
        return (
          <span key = { i } className = { itemText.className } >{ itemText.text }</span>
        )
      } else {
        return (
          <a key={ i } className={ itemText.className } onClick={ this.indexFn.bind(this, itemText.text) }>
          { itemText.text }
          </a>
        )
      };
    };
    
    preDisabled = nextDisabled = false;
    if(this.props.current == 1){
      preDisabled = true;
    }
    if(this.props.current == pageCount){
      nextDisabled = true;
    }

    let preClass = classNames({
      'prePage': true,
      'disabled': preDisabled,
    });

    let nextClass = classNames({
      'prePage': true,
      'disabled': nextDisabled,
    });

    if ( this.props.model ) {
      return ( 
        <div className="react-Page disSelect"> 
          {this.props.current} 
          <a className = {preClass} onClick = {this.preFn}>上一页</a> 
          {items.map(createItem)} 
          <a className = {nextClass} onClick = {this.nextFn}>下一页</a> 
        </div>
      )
    } else {
      return ( 
      <div className = "react-Page disSelect" > 
       共{' '}{ this.props.total }{' '}条记录 
        <div className="go-page-box">每页{' '}
        <select  className = "PageListLen" ref="iptPage" onChange = {this.changePageSize}>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>{' '}条
        </div>
        <a className={ preClass } onClick = { this.preFn } >上一页</a> 
        { items.map(createItem)} 
        <a className = { nextClass } onClick = { this.nextFn } > 下一页 < /a> 
        <PageGo GOFn = { this.GOFn } total = { this.props.total } pageSize = {this.props.pageSize}/>
        { this.props.current } 
      </div>
      )
    };
  }
}

export default Pagination