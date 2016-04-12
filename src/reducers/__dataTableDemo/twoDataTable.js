/**
 * Created by janeluck on 4/12/16.
 */

import Immutable from 'immutable'

export default function twoDataTable($$state = Immutable.Map({name: 'jane'}), action) {
    switch(action.type) {

        default:
            return $$state
    }
}