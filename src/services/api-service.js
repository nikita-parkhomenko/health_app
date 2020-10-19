
// outsource dependencies
import axios from "axios";

const API_BASE = 'https://healthene-gateway-dev.intelliceed.cf/api/auth-service/';

class ApiService {
    static getToken(user) {
        return axios.post(`${API_BASE}auth/token`, user)
            .then(resp => {
                if (resp.status === 200) {
                    return resp;
                }
            })
            .catch(err => err);
    }
    static getUser() {
        // объявляем локальную переменную tokenData
        let tokenData = null;

        // если в localStorage присутствует token, то берем её
        if (localStorage.token) {
            tokenData = JSON.parse(localStorage.getItem('token'));
        }
        const {accessToken, refreshToken} = tokenData;

        // добавляем токен в headers запроса
        const options = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }

        return axios.get(`${API_BASE}/auth/users/me`, options)
            .then(resp => {
                if (resp.status === 200) {
                    return resp;
                }
            })
    }
    static saveTokenToStorage(data) {
        localStorage.setItem('token', JSON.stringify(data));
    }
}

export default ApiService;
