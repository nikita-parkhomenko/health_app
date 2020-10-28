
// outsource dependencies
import { push } from 'connected-react-router';
import { API_BASE, instance } from './axios-instance'

// local dependencies
import axios from 'axios';
import store from '../store/store';
import { TYPE } from '../app-reducer';


class ApiService {
    static getToken(user) {
        return instance.post(`/auth-service/auth/token`, user)
            .then(resp => {
                if (resp.status === 200) {
                    return resp;
                }
            })
            .catch(err => err);
    }
    static refreshToken() {
        let tokenData = null;

        if (localStorage.getItem('token')) {
            tokenData = JSON.parse(localStorage.getItem('token'));
        } else {
            store.dispatch(push('/log-in'))
        }
        const { refreshToken } = tokenData;

        return axios.post(`${API_BASE}/auth-service/auth/token/refresh`, { refreshToken })
            .then(response => response)
            .catch(({ message }) => store.dispatch({ type: TYPE.META, payload: { errorMessage: message } }));
    }

    static getUser() {
        return instance.get(`/auth-service/auth/users/me`)
    }
    static getUsers() {
        return instance(`admin-service/users/filter`, {
            method: 'POST',
            data: {},
            params: {
                size: 10
            }
        });
    }
    static getRoles() {
        return instance(`admin-service/roles/filter`, {
            method: 'POST',
            data: {}
        })
    }

    static loadRoles(name) {
        return instance(`admin-service/roles/filter`, {
            method: 'POST',
            data: {
                name,
            }
        })
            .then(resp => resp.data.content)
            .then(roles => roles.map(role => ({ label: role.name }) ))
    }

    static filterUsers(data, params) {
        return instance('admin-service/users/filter', {
            method: "POST",
            data,
            params,
        })
    }
    static saveTokenToStorage(data) {
        localStorage.setItem('token', JSON.stringify(data));
    }
}

export default ApiService;
