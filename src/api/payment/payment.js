import { httpClient } from "../httpClient";
const API_END_POINT = '/payment'
const complete_payment = async (requestPaymentData) => {
    return await httpClient.post(`${API_END_POINT}/completePayment`, requestPaymentData);
}

const preparePayment = async (prepareData) => {
    return await httpClient.post(`${API_END_POINT}/prepare`,prepareData);
}

const getPaymentCompleteData = async (merchantUid) => {
    return await  httpClient.get(`orders/${merchantUid}`);
}
export {complete_payment, preparePayment, getPaymentCompleteData}