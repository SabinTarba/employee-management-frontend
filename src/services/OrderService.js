import axios from 'axios'

const ORD_API_FETCH_ALL_ORDERS = "http://localhost:8080/api/v1/orders/allOrders/"
const ORD_API_FETCH_ALL_STATUS_ORDERS = "http://localhost:8080/api/v1/orders/allStatus/"
const ORD_API_DELETE_ORDER_BY_ID = "http://localhost:8080/api/v1/orders/deleteOrder/"
const ORD_API_POST_ORDER = "http://localhost:8080/api/v1/orders/createOrder/"



class OrderService {

    async getOrders() {
        return axios.get(ORD_API_FETCH_ALL_ORDERS);
    }

    async getStatusOfOrders() {
        return axios.get(ORD_API_FETCH_ALL_STATUS_ORDERS);
    }

    async deleteOrder(id) {
        return axios.delete(ORD_API_DELETE_ORDER_BY_ID + id);
    }

    async createOrder(order) {
        return axios.post(ORD_API_POST_ORDER, order);
    }

}


export default new OrderService()