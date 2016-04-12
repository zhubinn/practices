/**
 * Created by yangtm
 */
import { bindActionCreators }from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/dedupe'

let custom_items;
class Custom extends React.Component {
  constructor() {
    super();
    this.changeVal = this.changeVal.bind(this)
    this.addItems = this.addItems.bind(this)
    this.delItems = this.delItems.bind(this)
    this.isRequired = this.isRequired.bind(this)
  }
  changeVal(index, e) {
    this.props.customFn(index, e.target.value)
  }
  addItems (index) {
    this.props.addItems(index)
  }
  delItems (index) {
    if(index == 0){
      alert("首条不可删除");
      return;
    }
    this.props.delItems(index)
  }
  switchItems(index){
    this.props.switchItems(index)
  }
  isRequired(e){
    this.props.isRequired()
  }
  render() {
      const createItem = (item, i) => {
        let txt = item.enabled ? '停止':'启用';
        return (
          <li key ={i}>
            <input type='text' onChange = {this.changeVal.bind(this, i)} value = { item.val } />
            <button onClick = {this.addItems.bind(this, i)} >添加</button>
            <button onClick = {this.delItems.bind(this, i)} >删除</button>
            <button onClick = {this.switchItems.bind(this, i)} >{txt}</button>
          </li>
        )
      }
      const createItemS = (item, i) => {
        let txt = item.enabled ? '启用':'停止';
        if(!item.enabled){
           return;
        }
        return (
          <p key ={i}>
            { item.val+" "+txt }
          </p>
        )
      }
      const custom_items = this.props.custom_items
      return ( 
      <div> 
        <div><label>是否必填<input type="checkbox" name="isAble" checked={this.props.Required} onChange = {this.isRequired.bind(this)}/></label></div>
        {this.props.Required.toString()}
        <ul>
        { custom_items.map(createItem)} 
        </ul>
        <ul>
        { custom_items.map(createItemS)} 
        </ul>
      </div>
      )
  }
}

export default Custom