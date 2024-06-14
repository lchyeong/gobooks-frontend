import { httpClient } from '../httpClient';

export const fetchProductsByCategory = async (categoryId) => {
  return await httpClient.get(`/products/category/${categoryId}`);
};

export const addOrUpdateProduct = async (product) => {
  const method = product.id ? 'put' : 'post';
  const url = product.id ? `/products/${product.id}` : '/products';
  return await httpClient[method](url, product);
};


export const deleteProduct = async (id) => {
  return await httpClient.delete(`/admin/products/${id}`);
};
