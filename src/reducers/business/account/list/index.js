/**
 * Created by janeluck on 4/15/16.
 */
import Immutable from 'immutable'



export default function userLogin($$state = Immutable.fromJS({}), action) {
    switch(action.type) {
        default:
            return $$state.merge({
                'accountType': 1
            })
    }
}