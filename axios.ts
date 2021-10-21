import { HACKERNEWS_API } from './constants';
import axios from 'axios';

const instance = axios.create({
    baseURL: HACKERNEWS_API, 
    timeout: 10000, 
    timeoutErrorMessage: 'Unable to reach server in time, please check your connection'
});

export default instance;