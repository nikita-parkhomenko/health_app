export const TYPE = (prefix => ({
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    SORT_USERS: `${prefix}SORT_USERS`,
    SEARCH_USERS: `${prefix}SEARCH_USERS`,
    NEXT_PAGE: `${prefix}NEXT_PAGE`,
}))('@users/');

const initial = {
    users: [],
    sortNamesASC: true,
    sortIdASC: true,
    currentPage: 1,
    totalPages: 0,

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
