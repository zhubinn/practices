import Immutable from 'immutable'

let searchInputObj = {
    val: "",
    focus: false,
};
export default function searchInput($$state = Immutable.fromJS(searchInputObj), action) {
    switch(action.type) {
    	case 'getData':
    	    return $$state;
        default:
            return $$state;
    }
}