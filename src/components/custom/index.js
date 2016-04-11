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
  }
  changeVal(index, e) {
    // let items = this.props.custom_items
    // items.splice(index, 1, {val: e.target.value})
    this.props.customFn(index, e.target.value)
  }
  addItems (index) {
    this.props.addItems(index)
  }
  delItems (index) {
    this.props.delItems(index)
  }
  render() {
      const createItem = (item, i) => {
        return (
          <p key ={i}>
            <input type='text' onChange = {this.changeVal.bind(this, i)} value = { item.val } />
            <button onClick = {this.addItems.bind(this, i)} >+++</button>
            <button onClick = {this.delItems.bind(this, i)} >----</button>
          </p>
        )
      }
      const custom_items = this.props.custom_items

      return ( 
      <div> 
        <div><input type="checkbox" name="isAble"/></div>
        { custom_items.map(createItem)} 
      </div>
      )
  }
}

export default Custom