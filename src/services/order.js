import Http from '@/utils/axios';
 
// 获取商品列表 用户
export async function Get_Order_List() {
  return Http(`/get/order`, 'GET', null);
}

// 获取商品列表 NPC
export async function Get_Order_NPC() {
  return Http(`/get/order/npc`, 'GET', null);
}

// 获取用户充值订单
export async function Get_Order_Pay() {
  return Http(`/get/order/pay`, 'GET', null);
}
