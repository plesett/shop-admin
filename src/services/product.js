import Http from '@/utils/axios';

// 获取商品列表
export async function Get_Product_List(page, per_page) {
  return Http(`/product_list?page=${page}&per_page=${per_page}`, 'GET', null);
}

// 获取商品详情
export async function Get_Product_detaile(product_id) {
  return Http(`/get/product?product_id=${product_id}`,'GET', null);
}

// 更新商品
export async function Get_Product_update(value) {
  return Http(`/update/product`,'PUT', {value: JSON.stringify(value)});
}

// 删除商品
export async function Get_Product_delete(product_id) {
  return Http(`/delete/product`,'DELETE', {product_id: product_id});
}

// 获取七牛的token
export async function Get_Product_qiniuToken() {
  return Http(`/upload`,'GET', null);
}

// 新增商品
export async function Get_Product_create(value) {
  return Http(`/create/product`,'GET', { value: JSON.stringify(value) });
}