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
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)

  }
  changeVal(index, e) {
    this.props.customFn(index, e.target.value)
  }
  addItems (index) {
    this.props.addItems(index)
  }
  delItems (index) {
    this.props.delItems(index)
  }
  switchItems(index){
    this.props.switchItems(index)
  }
  isRequired(e){
    this.props.isRequired()
  }
  moveUp (index) {
    this.props.moveUp(index)
  }
  moveDown (index) {
    this.props.moveDown(index)
  }
  render() {
      const custom_items = this.props.custom_items;
      let lastIndex =  custom_items.length - 1;

      const createItem = (item, i) => {
        let objItem = {
              switchTxt: item.enabled ? '停止':'开启',
              upDisable: (i == 0) ? '禁用':'上移',
              downDisable: (i == lastIndex) ? '禁用':'下移',
            }
        return (
          <li key ={i} style = {{marginBottom: "4px"}}>
            <button onClick = {this.moveUp.bind(this, i)} >{objItem.upDisable}</button>
            <button onClick = {this.moveDown.bind(this, i)} >{objItem.downDisable}</button>
            <input type='text' onChange = {this.changeVal.bind(this, i)} value = { item.val } />
            <button onClick = {this.addItems.bind(this, i)} >添加</button>
            <button onClick = {this.delItems.bind(this, i)} >删除</button>
            <button onClick = {this.switchItems.bind(this, i)} >{objItem.switchTxt}</button>
          </li>
        )
      }
      const createItemS = (item, i) => {
        let txt = item.enabled ? '开启':'停止';
        if(!item.enabled){
           return;
        }
        return (
          <li key ={i} style = {{marginBottom: "4px"}}>
            { item.val+" "+txt }
          </li>
        )
      }
      return ( 
      <div> 
        <div  style = {{marginBottom: "10px"}}><label>是否必填<input type="checkbox" name="isAble" checked={this.props.Required} onChange = {this.isRequired.bind(this)}/></label></div>
        {this.props.Required.toString()}
        <ul  style = {{margin: "10px 0"}}>
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