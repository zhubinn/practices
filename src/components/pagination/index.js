/**
 * Created by chenhf on 16-3-11.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './pagination.css'

class PageGo extends React.Component{
  render () {
    return (
      <div className="go-page-box">
        到<input className="inputPage" type="input" ref="iptPage"/>页 
        {" "} 
        <button className="goPage" onClick={this.goPage}>跳转</button> 
      </div>
    )
  }
}

class Pagination extends React.Component {

    render () {
    	const createItem = function(itemText, i) {
            return <a key={i}>{itemText.text}</a>;
        };

        const { pending } = this.props

     //    let classes = cx({
	    //   'prePage': true,
	    //   'disabled': this.props.preDisabled
	    // });

        return (
        	<div className="react-Page">
	            <div className="go-page-box">
			        列数：
			        <input className="PageListLen" type="text" />
			    </div>
			    <a className="disabled">上一页</a>
			    {[{text:1},{text:2},{text:3}].map(createItem)}
			    <a className="">下一页</a>
			    <PageGo/>
			</div>
            )
    }
}

export default Pagination
