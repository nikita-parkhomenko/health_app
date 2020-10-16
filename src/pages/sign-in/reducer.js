
// local dependencies
import TYPE from './actions';

const initial = {
    initialized: false,
    disabled: true,
    errorMessage: null,
}

export default function(state = initial, action) {
    switch (action.type) {
        case TYPE.META:
            return {
                ...state,
                ...action.payload
            }
        case TYPE.CLEAR:
            return initial;
        default:
            return state;
    }
}
