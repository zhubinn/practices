import Immutable from 'immutable'
import { CK_INPUT_CHANGE } from 'actions/Component/SearchInput'

let searchInputObj = {
    val: "",
    focus: false,
};
export default function searchInput($$state = Immutable.fromJS(searchInputObj), action) {
    switch(action.type) {
    	case CK_INPUT_CHANGE:
    	    return $$state.merge({ val: action.val });
        default:
            return $$state;
    }
}