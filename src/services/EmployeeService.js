import axios from 'axios'

const EMPLOYEE_API_BASE_URL = "https://employee-management-starba.herokuapp.com/api/v1/employees/allEmployees"

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL)
    }
}


export default new EmployeeService()
