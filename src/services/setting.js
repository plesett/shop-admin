import Http from '@/utils/axios';

// 获取商品列表
export async function Get_Setting(value) {
    if (typeof value === 'object') {
        return Http(`/get/setting`, 'PUT', value);    
    } else {
        return Http(`/get/setting`, 'GET', null);   
    }
}

// 获取设置
export async function Get_Seting_Sys() {
    return Http(`/notice`, 'GET', null);
}

// 提交修改后的设置
export async function PUT_Seting_Sys(value) {
    return Http(`/notice`, 'PUT', {value: JSON.stringify(value)});
}