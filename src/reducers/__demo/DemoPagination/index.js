/**
 * Created by yangtm  on 16-3-16.
 */
import Immutable from 'immutable'
import {
  CK_PAGE_CHANGE, 
  CK_CUSTOM_ADD, 
  CK_CUSTOM_DEL, 
  CK_CUSTOM_EDIT, 
  CK_CUSTOM_SWITCH, 
  CK_CUSTOM_ENABLE,
}
from 'actions/__demo/DemoPagination'

let userlistObj = {
  pagination: {
    total: 200,
    pageSize: 50,
    current: 1,
    userId: 1,
  }
}


export default function DemoPagination( $$state = Immutable.fromJS(userlistObj), action) {
  let current, pageSize, items, enabled;
  switch (action.type) {
    case CK_PAGE_CHANGE:
      current = action.pageIndex;
      pageSize = action.pageSize;
      return $$state.mergeDeep({
        pagination: {
          current: current,
          pageSize: pageSize,
        }
      })
      
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
      
      // items = state.get('customizable').get("items").toJS();
      // items.splice(action.index + 1, 0, {
      //   val: "",
      //   enabled: false
      // })
      // return state.mergeDeep({
      //   customizable: {
      //     items: items
      //   }
      // })
      
      items = $$state.get('customizable').get("items").insert(action.index+1, {val:'', enabled: false});
      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })
      
    case CK_CUSTOM_DEL:

      // items = state.get('customizable').get("items").delete(action.index);
      // //items = state.get('customizable').get("items").toJS();
      // // items.splice(action.index, 1)
      // return state.deleteIn(['customizable', 'items'], items).mergeDeep({
      //   customizable: {
      //     items: items
      //   }
      // });
      return $$state.deleteIn(['customizable', 'items',  action.index], items);

    case CK_CUSTOM_SWITCH:
      items = $$state.get('customizable').get("items").toJS();
      enabled = !items[action.index].enabled;
      let val = items[action.index].val;
      items.splice(action.index, 1, {val: val, enabled});
      // debugger
      // items = state.get('customizable').get("items").update(action.index, function(val) {
      //   return val.merge({
      //     enabled: !val.get("enabled")
      //   });
      // });

      return $$state.mergeDeep({
        customizable: {
          items: items
        }
      })

    case CK_CUSTOM_ENABLE:
      //isRequired = state.get('customizable').get('isRequired');
      // return state.mergeDeep({
      //   customizable: {
      //     isRequired: isRequired
      //   }
      // })
      return $$state.setIn(['customizable', 'isRequired'], !$$state.get('customizable').get('isRequired'))
    default:
      return $$state
  }
}