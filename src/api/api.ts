import axios from 'axios';
import type { cretaePark, updatePark } from '@/types/xhrPayLoadApi';
const BASE_URL = '/api'
let serveUrl = import.meta.env.MODE == "production" ? "http://8.131.89.181:3030/" : "/api";
const $axios = axios.create({
    baseURL:serveUrl,
    timeout: 5000,  //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers:{'Content-Type':'multipart/form-data'},
});
// 使用拦截器，定义全局请求头
$axios.interceptors.request.use(config => {
    // 在请求拦截器的请求头里面添加token
    const token = sessionStorage.getItem('token');
    if (config.headers) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config
})

$axios.interceptors.response.use(function (response) {
    // if (response.data.status == 401) {
    //     window.location.href = '/login'
    // }
    return response;
}, function (error) {
    if (error.response.data.status == 401) {
        window.location.href = '/login'
    }
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
 * @description 注册
 * @param payload  object
 */
export const register = function (payload = {}) {
    return $axios.post('/auth/register', payload)
}

/**
 * @description 获取个人用户信息
 */
export const getUserInfoApi = function () {
    return $axios.post('/auth/profile')
}

/**
 * @description 更新个人用户信息
 */
export const UpdateUserInfoApi = function (id: any, payload = {}) {
    return $axios.patch(`/user/${id}`, payload)
}



/**
 * @description 获取园区列表
 * @param payload ""
 */
export const getParkInfo = function (payload = {}) {
    return $axios.get('/parkInfo', payload);
}
//获取应急资源列表
// export const emergencyResource=function(payload={}){
/**
 * @description 新建园区
 * @param payload
 */
export const createPark = function (payload: cretaePark) {
    return $axios.post('/parkInfo', payload);
}
/**
 * @description 查询园区信息
 * @param payload
 */
export const queryParkInfo = function (id: number, payload = {}) {
    return $axios.get('/parkInfo/' + id, payload);
}
/**
 * @description 修改园区信息
 * @param payload
 */
export const updateParkInfo = function (payload: updatePark) {
    return $axios.patch('/parkInfo' + "/" + payload.id, payload);
}



/**
 * @description 创建企业列表
 * @param payload ""
 */
export const createEnterpriseList = function (payload = {}) {
    return $axios.post('/enterprise', payload);
}
/**
 * @description 获取企业列表
 * @param payload ""
 */
export const getEnterpriseList = function (payload = {}) {
    return $axios.get('/enterprise', payload);
}
/**
 * @description 删除企业信息
 * @param payload ""
 */
export const deleteEnterpriseList = function (id: number, payload = {}) {
    return $axios.delete('/enterprise' + '/' + id, payload);
}
/**
 * @description 修改企业信息
 * @param payload ""
 */
export const updateEnterpriseList = function (id: number, payload = {}) {
    return $axios.patch('/enterprise' + '/' + id, payload);
}
/**
 * @description 查看企业详情
 * @param payload ""
 */
export const getDetailEnterpriseList = function (id: number, payload = {}) {
    return $axios.get('/enterprise' + '/' + id, payload);
}

/**
 * @description 获取应急资源
 * 
 */
export const emergencyResource = function (payload = {}) {
    return $axios.get('/emergency-resource', payload)
}
//增加应急资源
export const addEmergencyResource = function (payload = {}) {
    return $axios.post('/emergency-resource', payload)
}
// 删除应急资源
export const deleteEmergencyResource = function (id: number, payload = {}) {
    return $axios.delete('/emergency-resource/' + id, payload)
}
// 更新应急资源
export const updateEmergencyResource = function (id: number, payload = {}) {
    return $axios.patch('/emergency-resource/' + id, payload)
}
// 查询应急资源详情
export const getEmergencyResource = function (id: number, payload = {}) {
    return $axios.get('/emergency-resource/' + id, payload)
}

// 
// 获取应急事件列表
export const emergencyEventList = function (payload = {}) {
    return $axios.get('/emergencyEvent', payload);
}
// 查询应急事件
export const getEmergencyEvent = function (id: number, payload = {}) {
    return $axios.get('/emergencyEvent/' + id, payload);
}
// 增加应急事件
export const addEmergencyEvent = function (payload = {}) {
    return $axios.post('/emergencyEvent', payload);
}
// 更新应急事件
export const updateEmergencyEvent = function (id: number, payload = {}) {
    return $axios.patch('/emergencyEvent/' + id, payload);
}
// 删除应急事件
export const deleteEmergencyEvent = function (id: number, payload = {}) {
    return $axios.delete('/emergencyEvent/' + id, payload);
}


// 获取厂区位置列表
export const siteList = function (payload = {}) {
    return $axios.get('/site/', payload);
}
// 查询厂区位置
export const getSite = function (id: number, payload = {}) {
    return $axios.get('/site/' + id, payload);
}
// 增加厂区位置
export const addSite = function (payload = {}) {
    return $axios.post('/site', payload);
}
// 更新厂区位置
export const updateSite = function (id: number, payload = {}) {
    return $axios.patch('/site/' + id, payload);
}
// 删除厂区位置
export const deleteSite = function (id: number, payload = {}) {
    return $axios.delete('/site/' + id, payload);
}


// 获取人员信息
export const getUserListApi = function (payload = {}) {
    return $axios.get('/user', payload);
}
// 查询人员信息
export const getUserApi = function (id: any, payload = {}) {
    return $axios.get('/user/' + id, payload);
}
// 修改人员信息
export const patchUserListApi = function (id: any, payload = {}) {
    return $axios.patch('/user/' + id, payload);
}

// 获取位置信息
export const factorySiteApi = function (payload = {}) {
    return $axios.get('/site', payload)
}

// 添加资源派发记录
export const addResourceRecordApi = function (payload = {}) {
    return $axios.post('/emergency-dispatch', payload)
}
// 获取资源派发记录表
export const getResourceRecordApi = function (payload = {}) {
    return $axios.get('/emergency-dispatch', payload)
}
// 删除派发记录
export const deleteResourceRecordApi = function (id: any, payload = {}) {
    return $axios.delete('/emergency-dispatch/' + id, payload)
}
// 更新派发记录
export const updateResourceRecordApi = function (id: any, payload = {}) {
    return $axios.patch('/emergency-dispatch/' + id, payload)
}
//创建角色
export const  addRoleListApi=function(payload={}){
    return $axios.post('/role',payload)
}
//获取角色
export const  getRoleListApi=function(payload={}){
    return $axios.get('/role',payload)
}
//删除角色
export const  deleteRoleListApi=function(id:any,payload={}){
    return $axios.delete('/role/'+id,payload)
}
export default $axios