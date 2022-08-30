import axios from 'axios'



const EMPLOYEE_API_FETCH_ALL_EMPLOYEES = "https://employee-management-starba.herokuapp.com/api/v1/employees/allEmployees"
const EMPLOYEE_API_POST_EMPLOYEE = "https://employee-management-starba.herokuapp.com/api/v1/employees/createEmployee"
const EMPLOYEE_API_GET_EMPLOYEE_BY_ID = "https://employee-management-starba.herokuapp.com/api/v1/employees/getEmployee/"
const EMPLOYEE_API_PUT_EMPLOYEE = "https://employee-management-starba.herokuapp.com/api/v1/employees/updateEmployee/"
const EMPLOYEE_API_DELETE_EMPLOYEE = "https://employee-management-starba.herokuapp.com/api/v1/employees/deleteEmployee/"
const EMPLOYEE_API_FETCH_EMPLOYEES_WITH_INFO = "https://employee-management-starba.herokuapp.com/api/v1/employees/allInfoEmployees/"



class EmployeeService {

    async getEmployees() {
        return await axios.get(EMPLOYEE_API_FETCH_ALL_EMPLOYEES)
    }

    async createEmployee(employee) {
        return await axios.post(EMPLOYEE_API_POST_EMPLOYEE, employee)
    }

    async getEmployeeById(id) {
        return await axios.get(EMPLOYEE_API_GET_EMPLOYEE_BY_ID + id);
    }

    async updateEmployee(employee) {
        return await axios.put(EMPLOYEE_API_PUT_EMPLOYEE + employee.id, employee);
    }

    async deleteEmployee(id) {
        return await axios.delete(EMPLOYEE_API_DELETE_EMPLOYEE + id);
    }

    async getEmployeesInfo() {
        return await axios.get(EMPLOYEE_API_FETCH_EMPLOYEES_WITH_INFO);
    }
}


export default new EmployeeService()
