import axios from 'axios';

const apiUrl = 'http://localhost:8080';

async function get(endpoint, params = '') {
    const url = params
        ? `${apiUrl + endpoint}/${params}`
        : `${apiUrl + endpoint}`;

    return axios.get(url, {
        headers: {
            userToken: `${localStorage.getItem('userToken')}`,
        },
    });
}

async function post(endpoint, data) {
    return axios.post(apiUrl + endpoint, data, {
        headers: {
            userToken: `${localStorage.getItem('userToken')}`,
        },
    });
}

async function patch(endpoint, data) {
    return axios.patch(apiUrl + endpoint, data, {
        headers: {
            userToken: `${localStorage.getItem('userToken')}`,
        },
    });
}

async function del(endpoint, data) {
    return axios.delete(`${apiUrl + endpoint}`, {
        data,
        headers: {
            userToken: `${localStorage.getItem('userToken')}`,
        },
    });
}

export { get, post, patch, del as delete };
