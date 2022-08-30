import axios from 'axios'

const EMPLOYEE_API_FETCH_ALL_EMPLOYEES = "http://localhost:8080/api/v1/employees/allEmployees/"
const EMPLOYEE_API_POST_EMPLOYEE = "http://localhost:8080/api/v1/employees/createEmployee/"
const EMPLOYEE_API_GET_EMPLOYEE_BY_ID = "http://localhost:8080/api/v1/employees/getEmployee/"
const EMPLOYEE_API_PUT_EMPLOYEE = "http://localhost:8080/api/v1/employees/updateEmployee/"
const EMPLOYEE_API_DELETE_EMPLOYEE = "http://localhost:8080/api/v1/employees/deleteEmployee/"


const EMPLOYEE_API_BASE_URL = "https://employee-management-starba.herokuapp.com/api/v1/employees/allEmployees"

class EmployeeService {

    async getEmployees() {
        return axios.get(EMPLOYEE_API_FETCH_ALL_EMPLOYEES)
    }

    async createEmployee(employee) {
        return axios.post(EMPLOYEE_API_POST_EMPLOYEE, employee)
    }

    async getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_GET_EMPLOYEE_BY_ID + id);
    }

    async updateEmployee(employee) {
        return axios.put(EMPLOYEE_API_PUT_EMPLOYEE + employee.id, employee);
    }

    async deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_DELETE_EMPLOYEE + id);
    }
}


export default new EmployeeService()
