export const TYPE = (prefix => ({
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    LOG_IN: `${prefix}LOG_IN`,
}))('@log-in/');

const initial = {
    initialized: false,
    disabled: true,
    errorMessage: null,
}

export default function(state = initial, action) {
    switch (action.type) {
        case TYPE.META:
            return { ...state, ...action.payload }
        case TYPE.CLEAR:
            return initial;
        default:
            return state;
    }
}

export const selector = state => state.logIn;
