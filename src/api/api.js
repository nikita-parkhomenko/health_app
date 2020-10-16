// outsource dependencies
import axios from 'axios';

export function getToken(user) {
    return axios.post('https://healthene-gateway-dev.intelliceed.cf/api/auth-service/auth/token', user)
        .then(resp => resp)
        .catch(err => err);
}
