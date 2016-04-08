/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'
import './pagination.css'

class PageGo extends React.Component{
  constructor(){
      super()
      this.GOFn = this.GOFn.bind(this)
  }
  GOFn () {
    let index = this.refs.iptPage.getDOMNode().value
    index = parseInt(index);
    this.props.GOFn(index);
  }
  render () {
    return (
      <div className="go-page-box">
        到<input className="inputPage" type="input" ref="iptPage"/>页 
        {" "} 
        <button className="goPage" onClick = {this.GOFn}>跳转</button> 
      </div>
    )
  }
}

class Pagination extends React.Component {
    constructor(){
      super()
      this.GOFn = this.GOFn.bind(this)
    }
    GOFn (index) {
      this.props.GOFn(index)
    }
    render () {
    	const createItem = (itemText, i) => {
            itemText = itemText.toJS();
            if(itemText.className == "ellipsis" || itemText.className == "current"){
              return <span key={i} className = {itemText.className}>{itemText.text}</span>;
            }else{
              return <a key={i} className = {itemText.className} onClick = {this.props.indexFn.bind(this, itemText.text)}>{itemText.text}</a>;
            };
      };

      let preClass = classNames({
        'prePage': true,
        'disabled': this.props.preDisabled
      });

      let nextClass = classNames({
        'prePage': true,
        'disabled': this.props.nextDisabled
      });

      let items = this.props.items;

      return (
        <div className="react-Page">
	          <div className="go-page-box">
			        列数：
			        <input className="PageListLen" type="text" />
			      </div>
			      <a className={preClass} onClick={this.props.preFn}>上一页</a>
			      {items.map(createItem)}
			      <a className={nextClass} onClick={this.props.nextFn}>下一页</a>
			      <PageGo GOFn ={this.GOFn}/>
			 </div>
      )
    }
}

export default Pagination
