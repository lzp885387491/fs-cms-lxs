import type { Ref } from "vue";

//登录
export interface login{
    username?:string,
    password?:string,
}

// 新建园区
/**
 * @param name 园区名称
 * @param location 园区位置
 * @param area 园区面积
 * @param description 园区描述
 * @param longitude 经度
 * @param latitude 纬度
 */
export interface cretaePark{
    name:string,
    location:string,
    area:number,
    description:string,
    longitude:number,
    latitude:number,
}

/**
 * @param id 园区id
 */
export interface queryParkDetail{
    id:number
}

// 修改园区
/**
 * @param id 园区id
 * @param name 园区名称
 * @param location 园区位置
 * @param area 园区面积
 * @param description 园区描述
 * @param longitude 经度
 * @param latitude 纬度
 */
export interface updatePark{
    id:number,
    name:string,
    location:string,
    area:number,
    description:string,
    longitude:number,
    latitude:number,
}