import axios from './api'

interface playoad {
    id?: number
}


// 创建应急预案列表
export const createEmergencyPlanList = function (payload = {}) {
    return axios.post('/emergency-plan', payload);
}


// 获取应急预案列表
export const getEmergencyPlanList = function (payload = {}) {
    return axios.get('/emergency-plan', payload);
}


// 获取应急预案详情
export const getEmergencyPlanDetail = function (payload: playoad = {}) {
    return axios.get('/emergency-plan/' + payload.id);
}


// 修改应急预案
export const updateEmergencyPlan = function (id:number,playoad:any = {}) {
    return axios.patch('/emergency-plan/' + id,playoad);
}


// 删除应急预案
export const deleteEmergencyPlan = function (payload: playoad = {}) {
    return axios.delete('/emergency-plan/' + payload.id);
}

//获取地区列表
export const getSiteList = function () {
    return axios.get('/site');
}
