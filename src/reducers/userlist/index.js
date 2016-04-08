/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'

let userlistObj = {
  pagination: {
    total: 200,
    pageSize: 10,
    current: 1,
  }
}

let current, total, pageSize;

export default function userlist(state = Immutable.fromJS(userlistObj), action) {
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
    default:
      return state
  }
}


const pageChangeAction = (pageIndex, pageSize)=> {
    return (dispatch, getState) => {
        dispatch({
            type: 'CK_PAGE_CHANGE',
            pageIndex: pageIndex,
            pageSize: pageSize
        })
    }
}

export {
    pageChangeAction,
}