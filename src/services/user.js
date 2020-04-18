import request from '@/utils/request';
import Http from '@/utils/axios';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

// 获取用户列表
export async function Get_User_List() {
  return Http(`/get/user`, 'POST', null);
}

// 获取用户信息
export async function Get_User_Info(uid) {
  return Http(`/user/info`, 'POST', { uid: uid} );
}

// 删除用户
export async function Get_User_delete(uid) {
  return Http(`/delete/user?uid=${uid}`, 'DELETE', null);
}

// 更新用户
export async function Get_User_update(value) {
  return Http(`/user/info/update`, 'PUT', { value: JSON.stringify(value) });
}