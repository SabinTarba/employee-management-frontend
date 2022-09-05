import axios from 'axios'


const API_PRODUCT_FETCH_ALL_PRODUCTS = "https://employee-management-starba.herokuapp.com/api/v1/products/allProducts/";
const API_PRODUCT_DELETE_PRODUCT = "https://employee-management-starba.herokuapp.com/api/v1/products/deleteProduct/";
const API_PRODUCT_TOGGLE_ACTIVE = "https://employee-management-starba.herokuapp.com/api/v1/products/toggleActive/";
const API_PROUDCT_CREATE_PRODUCT = "https://employee-management-starba.herokuapp.com/api/v1/products/createProduct/";
const API_PRODUCT_PUT_PRODUCT = "https://employee-management-starba.herokuapp.com/api/v1/products/updateProduct";


class ProductService {

    async getProducts() {
        return await axios.get(API_PRODUCT_FETCH_ALL_PRODUCTS);
    }

    async deleteProduct(id) {
        return await axios.delete(API_PRODUCT_DELETE_PRODUCT + id);
    }

    async toggleActive(id, option) {
        return await axios.get(API_PRODUCT_TOGGLE_ACTIVE + id + "/" + option);
    }

    async createProduct(product) {
        return await axios.post(API_PROUDCT_CREATE_PRODUCT, product);
    }

    async updateProduct(product) {
        return await axios.put(API_PRODUCT_PUT_PRODUCT, product);
    }

}

export default new ProductService();
