import { httpClient } from '../httpClient';

export const signUp = (req) => {
  return httpClient.post('/users', req);
};

export const getUserInfo = async (userId) => {
  const response = await httpClient.get(`/users/${userId}`);
  return response.data;
};

export const getUserAddress = async (userId) => {
  const response = await httpClient.get(`/users/address/${userId}`);
  return response.data;
};

export const saveUserAddress = async (userId, address) => {
  const response = await httpClient.post(`/users/address/${userId}`, address);
  return response.data;
};

export const updateUserAddress = async (userId, address) => {
  const response = await httpClient.put(`/users/address/${userId}`, address);
  return response.data;
};

export const deleteUserAddress = async (userId, addressId) => {
  const response = await httpClient.delete(
    `/users/address/${userId}/${addressId}`,
  );
  return response.data;
};
export const updateUserInfo = async (id, userInfo) => {
  const response = await httpClient.put(`/users/${id}`, userInfo);
  return response.data;
};

export const deleteUser = async (id) => {
  await httpClient.delete(`/users/${id}`);
};

export const getAllUserInfo = async () => {
  const response = await httpClient.get(`/users`);
  return response.data;
};

export const handleFetchUserInfo = async (userId) => {
  try {
    const userInfo = await getUserInfo(userId);
    console.log(userInfo);
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};

export const sendVerificationCode = async (email) => {
  const response = await httpClient.post('/auth/send-code', { email });
  return response.data;
};

export const verifyCode = async (email, code) => {
  const response = await httpClient.post('/auth/verify-code', { email, code });
  return response.data;
};

export const checkEmail = (email) => {
  return httpClient.get('/auth/check-email', { params: { email } });
};

export const getUserStatusCounts = async () => {
  const response = await httpClient.get('/admin/users/status');
  return response.data;
};