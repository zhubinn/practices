/**
 * Created by janeluck on 4/25/16.
 */

import Immutable from 'immutable'

const $$initialState = Immutable.fromJS({})

export default function userLogin($$state = $$initialState, action) {
    switch(action.type) {
        default:
            return $$state.merge({
                'page': '这是客户汇总表页面'
            })
    }
}