/**
 * Created by chenhf on 16-3-16.
 */
import Immutable from 'immutable'

const $$initialState = Immutable.fromJS({})

export default function userLogin($$state = $$initialState, action) {
    switch(action.type) {
        default:
            return $$state.merge({
                '这是个': '例子'
            })
    }
}