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
      {val:"1级代理"},
      {val:"2级代理"}
    ]
  }
}


export default function userlist(state = Immutable.fromJS(userlistObj), action) {
  let current, total, pageSize, items;
  switch (action.type) {
    case 'CK_PAGE_CHANGE':
      current = action.pageIndex;
      pageSize = action.pageSize;
      total = state.get('pagination').get("total");
      return state.merge({
        pagination: {
          current: current,
          total: total,
          pageSize: pageSize,
        }
      })
    case 'CK_CUSTOM_EDIT':
      items = state.get('customizable').get("items").toJS();
      items.splice(action.index, 1, {val: action.val})
      return state.merge({
        customizable: {
          items: action.items,
        }
      })
    case 'CK_CUSTOM_ADD':
      items = state.get('customizable').get("items").toJS();
      items.splice(action.index + 1, 0, {val: ""})
      return state.merge({
        customizable: {
          items: items
        }
      })
    case 'CK_CUSTOM_DEL':
      items = state.get('customizable').get("items").toJS();
      items.splice(action.index, 1)
      return state.merge({
        customizable: {
          items: items
        }
      })
    default:
      return state
  }
}


