import axios from 'axios'

const ORD_API_FETCH_ALL_ORDERS = "http://localhost:8080/api/v1/orders/allOrders/"
const ORD_API_FETCH_ALL_STATUS_ORDERS = "http://localhost:8080/api/v1/orders/allStatus/"
const ORD_API_DELETE_ORDER_BY_ID = "http://localhost:8080/api/v1/orders/deleteOrder/"
const ORD_API_POST_ORDER = "http://localhost:8080/api/v1/orders/createOrder/"
const ORD_API_PUT_ORDER = "http://localhost:8080/api/v1/orders/updateOrder/"
const ORD_API_FETCH_ALL_ORDERS_WITH_INFO = "http://localhost:8080/api/v1/orders/allInfoOrders/"
const ORD_API_FETCH_ALL_ORDER_SOURCES = "http://localhost:8080/api/v1/orders/allOrderSources/"
const ORD_API_PROCESS_ORDER = "http://localhost:8080/api/v1/orders/processOrder/"



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

    async updateOrder(order) {
        return await axios.put(ORD_API_PUT_ORDER + order.ord, order);
    }

    async getOrdersInfo() {
        return await axios.get(ORD_API_FETCH_ALL_ORDERS_WITH_INFO);
    }

    async getOrderSources() {
        return await axios.get(ORD_API_FETCH_ALL_ORDER_SOURCES);
    }

    async processOrder(ord) {
        return await axios.get(ORD_API_PROCESS_ORDER + ord);
    }
}


export default new OrderService()
