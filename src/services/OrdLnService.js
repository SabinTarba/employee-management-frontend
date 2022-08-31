import axios from 'axios'


const ORDLN_API_POST_ORDLN = "https://employee-management-starba.herokuapp.com/api/v1/ordlines/createLine";

class OrdLnService {

    async createLine(line) {
        return await axios.post(ORDLN_API_POST_ORDLN, line);
    }
}


export default new OrdLnService();
