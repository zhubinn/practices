/**
 * Created by yangtm  on 16-3-16.
 */
import Immutable from 'immutable'

let userlistObj = {
  pagination: {
    total: 200,
    pageSize: 10,
    current: 1,
    userId: 1,
  },
  customizable: {
    items:[
      {val:"1级代理", able: false},
      {val:"2级代理", able: false}
    ]
  }
}


export default function userlist(state = Immutable.fromJS(userlistObj), action) {
  let current, pageSize, items, able;
  switch (action.type) {
    case 'CK_PAGE_CHANGE':
      current = action.pageIndex;
      pageSize = action.pageSize;
      return state.mergeDeep({
        pagination: {
          current: current,
          pageSize: pageSize,
        }
      })
    case 'CK_CUSTOM_EDIT':
      
      items = state.get('customizable').get("items").toJS();
      able = items[action.index].able;
      items.splice(action.index, 1, {val: action.val, able})
      return state.merge({
        customizable: {
          items: items
        }
      })
    case 'CK_CUSTOM_ADD':

      items = state.get('customizable').get("items").toJS();
      able = items[action.index].able;
      items.splice(action.index + 1, 0, {val: "", able:false})
      return state.merge({
        customizable: {
          items: items
        }
      })
    case 'CK_CUSTOM_DEL':

      items = state.get('customizable').get("items").toJS();
      able = items[action.index].able;
      items.splice(action.index, 1)
      return state.merge({
        customizable: {
          items: items
        }
      })
    case 'CK_CUSTOM_SWITCH':
      items = state.get('customizable').get("items").toJS();
      able = !items[action.index].able
      let val = items[action.index].val
      items.splice(action.index, 1, {val: val, able})
      return state.merge({
        customizable: {
          items: items
        }
      })

    default:
      return state
  }
}


