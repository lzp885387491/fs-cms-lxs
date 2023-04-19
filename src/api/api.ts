import axios from 'axios';
// import type { login } from "@/types/xhrPayLoadApi"; //写接口

const BASE_URL = '/api'

const $axios = axios.create({
    baseURL: '/api',
    timeout: 5000,  //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers:{'Content-Type':'multipart/form-data'},
});
// 使用拦截器，定义全局请求头
$axios.interceptors.request.use(config => {
    // 在请求拦截器的请求头里面添加token
    let token = sessionStorage.getItem('token');
    if (config.headers) {
        config.headers.token = token
    }
    return config
})

$axios.interceptors.response.use(function (response) {
    // if (response.data.status == 401) {
    //     // window.location.href = '/login'
    // }
    return response;
}, function (error) {
    return Promise.reject(error);
})

/**
 * @description 登录
 * @param payload  object
 */
export const login = function (payload = {}) {
    return $axios.post('/auth/login', payload)
}
/**
 * @description 获取园区列表
 * @param payload ""
 */
export const getParkInfo = function (payload = {}) {
    return $axios.get('/parkInfo', payload);
}
