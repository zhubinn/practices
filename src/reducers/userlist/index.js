/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'
let userlistObj = {
  pagination: {
    items: [],
    pageCount: 20,
    current: 1,
    preDisabled: true,
    nextDisabled: false,
    size: 20
  }
}

const fillList = function(cacheCurrent) {
  let current = cacheCurrent || userlistObj.pagination.current;
  let pageCount = userlistObj.pagination.pageCount;
  let items = [];
  let obj = {};
  //列表页码
  if (current != 1 && current >= 4 && pageCount != 4) {
    obj.text = 1;
    items.push(obj);
    obj = {};
  };
  if (current - 2 > 2 && current <= pageCount && pageCount > 5) {
    obj.text = "...";
    obj.className = "ellipsis";
    items.push(obj);
    obj = {};
  };
  let start = current - 2,
    end = current + 2;
  if ((start > 1 && current < 4) || current == 1) {
    end++;
  };
  if (current > pageCount - 4 && current >= pageCount) {
    start--;
  };
  for (; start <= end; start++) {
    if (start <= pageCount && start >= 1) {
      if (start != current) {
        obj.text = start;
        items.push(obj);
        obj = {};
      } else {
        obj.text = start;
        obj.className = "current";
        items.push(obj);
        obj = {};
      }
    }
  };
  if (current + 2 < pageCount - 1 && current >= 1 && pageCount > 5) {
    obj.text = "...";
    obj.className = "ellipsis";
    items.push(obj);
    obj = {};
  };
  if (current != pageCount && current < pageCount - 2 && pageCount != 4) {
    obj.text = pageCount;
    items.push(obj);
    obj = {};
  };
  return items;
}

let items;
let current;

userlistObj.pagination.items = fillList(1);

export default function userlist(state = Immutable.fromJS(userlistObj), action) {
  switch (action.type) {
    case 'CK_PAGE_PRE':
      current = state.toJS().pagination.current;
      if (current == 1) {
        return state;
      }
      items = fillList(current - 1);
      return state.merge({
        pagination: {
          items: items,
          current: current - 1
        }
      })
    case 'CK_PAGE_NEXT':
      current = state.toJS().pagination.current;
      if (current == 20) {
        return state;
      }
      items = fillList(current + 1);
      return state.merge({
        pagination: {
          items: items,
          current: current + 1
        }
      })
    case 'CK_PAGE_INDEX':
      return state.merge({
        pending: "index"
      })
    default:
      return state
  }
}