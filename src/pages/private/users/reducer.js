export const TYPE = (prefix => ({
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    FILTER_ITEMS: `${prefix}FILTER_ITEMS`,
}))('@users/');

const initial = {
    items: [],
    //filter
    name: '',
    page: 0,
    sort: '',
    size: 20,
    sortASC: false,

    totalElements: 0,

    disabled: false,
    initialized: false,
    errorMessage: null,
}

export default function(state = initial, action) {
    switch (action.type) {
        case TYPE.META:
            return {...state, ...action.payload }
        case TYPE.CLEAR:
            return initial;
        default:
            return state;
    }
}

export const selector = state => state.users;
