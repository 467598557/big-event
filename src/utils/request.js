import axios from 'axios'
import {MessageBox, Message} from 'element-ui'

const service = axios.create({
    baseURL: 'http://localhost:7001/',
    timeout: 5000,
    withCredentials: true
})

service.interceptors.request.use(config => {
    // add some param in header
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        let headers = response.headers
        let data = response.data || {}
        if (headers['sessionstatus'] === 'timeout' || data.retCode === '9304') { // 登录状态过期
            MessageBox.alert('你已被登出，可以取消继续留在该页面，或者重新登录', '登录超时', {
                type: 'warning',
                showClose: false,
                center: true
            }).then(() => {
                // 登录跳转
            })
            return Promise.reject(data)
        } else if (data.retCode !== '0000') {
            return Promise.reject(data)
        }
        return data
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        // return Promise.reject(error)
    })

// export default service

function checkStatus(response) {
    return response
}

const request = (config) => {
    return service.request(config).then(checkStatus)
}

export const GET = (url, data, config) => {
    const CONF = {
        url,
        method: 'get',
        params: data,
    }

    return request({...CONF, ...config})
}

export const POST = (url, data, config) => {
    const CONF = {
        url,
        method: 'post',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        data,
    }
    return request({...CONF, ...config})
}

export const PUT = (url, data, config) => {
    const CONF = {
        url,
        method: 'put',
        data,
    }
    return request({...CONF, ...config})
}

export const DELETE = (url, data, config) => {
    const CONF = {
        url,
        method: 'delete',
        data,
    }
    return request({...CONF, ...config})
}
