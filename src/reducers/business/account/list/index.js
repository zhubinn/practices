/**
 * Created by janeluck on 4/15/16.
 */
import Immutable from 'immutable'



export default function account_list ($$state = Immutable.fromJS({
        formData: {
            rowsPerPage: 0,
            page: 1,
            searchData1: {

            },
            searchData2: {

            }

    }

}), action) {
    switch(action.type) {
        default:
            return $$state.merge({
                'accountType': 1
            })
    }
}