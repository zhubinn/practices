import Immutable from 'immutable'

let SearchInput = {
    value: "",
    focus: false,
};
export default function userLogin($$state = Immutable.fromJS(SearchInput), action) {
    switch(action.type) {
    	case 'getData':
    	    return $$state;
        default:
            return $$state;
    }
}