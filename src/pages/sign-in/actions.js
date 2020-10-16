const TYPE = (prefix => ({
    // simple actions
    META: `${prefix}META`,
    CLEAR: `${prefix}CLEAR`,
    // complex actions
    INITIALIZE: `${prefix}INITIALIZE`,
    FETCH_TOKEN: `${prefix}FETCH_TOKEN`,
}))('@log-in/');

export default TYPE;
