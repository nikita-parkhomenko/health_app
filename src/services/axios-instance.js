
// outsource dependencies
import axios from 'axios';
import { push } from 'connected-react-router';

// local dependencies
import store from '../store/store';
import ApiService from './api-service';

export const API_BASE = 'https://healthene-gateway-dev.intelliceed.cf/api/';

export const instance = axios.create({
    baseURL: API_BASE,
});

let subscribers = [];
let isRefreshing = false;
const subscribeTokenRefresh = cb =>  subscribers.push(cb);
const onRefreshed = newToken => subscribers.map(cb => cb(newToken));

instance.interceptors.response.use(
    response => response,
    error => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401) {
            // need to refresh tokens
            // checking that the following requests will not refresh tokens again
            if (!isRefreshing) {
                isRefreshing = true;
                // get new pair of tokens
                ApiService.refreshToken()
                    .then(response => {
                        const { accessToken, refreshToken } = response.data;
                        // save new tokens to storage
                        ApiService.saveTokenToStorage({ accessToken, refreshToken });
                        isRefreshing = false;
                        instance.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
                        // start executing the request queue. give a new access token
                        onRefreshed(accessToken);
                        // clean subscribers requests queue
                        subscribers = [];
                    });
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh(token => {
                    // replace the expired token and retry
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    resolve(axios(originalRequest));
                });
            });
            } else {
                store.dispatch(push('/log-in'));
                return Promise.reject(error);
            }
});
