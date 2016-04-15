/**
 * Created by yangtm  on 16-3-16.
 */
import Immutable from 'immutable'
import {
  CK_CUSTOM_ADD, 
  CK_CUSTOM_DEL, 
  CK_CUSTOM_EDIT, 
  CK_CUSTOM_SWITCH, 
  CK_CUSTOM_ENABLE,
  CK_CUSTOM_MOVEUP,
  CK_CUSTOM_MOVEDOWN,
}
from 'actions/__demo/DemoTodoList'

let userlistObj = {
  customizable: {
    items: [{
      val: "3级代理",
      enabled: false
    }, {
      val: "1级代理",
      enabled: false
    }, {
      val: "2级代理",
      enabled: false
    }],
    isRequired: false
  }
}


export default function DemoPagination( $$state = Immutable.fromJS(userlistObj), action) {
  let current, pageSize, items, enabled;
  switch (action.type) {
      
    case CK_CUSTOM_EDIT:
      items = $$state.get('customizable').get("items").toJS();
      items.splice(action.index, 1, {
        val: action.val
      })
      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })

    case CK_CUSTOM_ADD:
      items = $$state.get('customizable').get("items").insert(action.index+1, {val:'', enabled: false});
      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })
      
    case CK_CUSTOM_DEL:
      if(action.index == 0){
        console.log("首条不能删除");
        return $$state;
      }
      return $$state.deleteIn(['customizable', 'items',  action.index], items);

    case CK_CUSTOM_SWITCH:
      items = $$state.get('customizable').get("items").toJS();
      enabled = !items[action.index].enabled;
      let val = items[action.index].val;
      items.splice(action.index, 1, {val: val, enabled});

      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })

    case CK_CUSTOM_ENABLE:
      return $$state.setIn(['customizable', 'isRequired'], !$$state.get('customizable').get('isRequired'))

    case CK_CUSTOM_MOVEUP:
      items = $$state.get('customizable').get("items").toJS();
      if(action.index == 0){
        console.log("首条不能上移");
        return $$state;
      }
      [items[action.index], items[action.index-1]] = [items[action.index-1], items[action.index]];
      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })

    case CK_CUSTOM_MOVEDOWN:
      items = $$state.get('customizable').get("items").toJS();
      if(action.index == items.length-1){
        console.log("尾条不能下移");
        return $$state;
      }
      [items[action.index], items[action.index+1]] = [items[action.index+1], items[action.index]];
      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })
    default:
      return $$state
  }
}