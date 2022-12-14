import axios from 'axios'


const ORDLN_API_POST_ORDLN = "https://employee-management-starba.herokuapp.com/api/v1/ordlines/createLine";
const ORDLN_API_POST_BULK_ORDLN = "https://employee-management-starba.herokuapp.com/api/v1/ordlines/bulkCreateLines";
const ORDLN_API_GET_ORD_LINES = "https://employee-management-starba.herokuapp.com/api/v1/ordlines/getOrderLines/";


class OrdLnService {

    async createLine(line) {
        return await axios.post(ORDLN_API_POST_ORDLN, line);
    }

    async bulkCreateLines(lines) {
        return await axios.post(ORDLN_API_POST_BULK_ORDLN, lines);
    }

    async getOrderLines(ord) {
        return await axios.get(ORDLN_API_GET_ORD_LINES + ord);
    }
}


export default new OrdLnService();
