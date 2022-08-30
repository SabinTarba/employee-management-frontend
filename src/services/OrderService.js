import axios from 'axios'

const ORD_API_FETCH_ALL_ORDERS = "https://employee-management-starba.herokuapp.com//api/v1/orders/allOrders/"
const ORD_API_FETCH_ALL_STATUS_ORDERS = "https://employee-management-starba.herokuapp.com//api/v1/orders/allStatus/"
const ORD_API_DELETE_ORDER_BY_ID = "https://employee-management-starba.herokuapp.com//api/v1/orders/deleteOrder/"
const ORD_API_POST_ORDER = "https://employee-management-starba.herokuapp.com//api/v1/orders/createOrder/"



class OrderService {

    async getOrders() {
        return await axios.get(ORD_API_FETCH_ALL_ORDERS);
    }

    async getStatusOfOrders() {
        return await axios.get(ORD_API_FETCH_ALL_STATUS_ORDERS);
    }

    async deleteOrder(id) {
        return await axios.delete(ORD_API_DELETE_ORDER_BY_ID + id);
    }

    async createOrder(order) {
        return await axios.post(ORD_API_POST_ORDER, order);
    }

}


export default new OrderService()
