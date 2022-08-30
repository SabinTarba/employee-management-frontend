import { useState, useEffect } from 'react'
import EmployeeService from '../../services/EmployeeService'
import { Link, useNavigate } from 'react-router-dom';




function ListEmployeeComponent() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const getEmployees = () => {
        EmployeeService.getEmployeesInfo().then((employees) => {
            setEmployees(employees.data);
        })
    }

    useEffect(() => {
        getEmployees();
    }, [])

    const updateEmployee = (id) => {
        navigate("/update-employee/" + id);
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then((res) => {

            if (res.status === 200) {
                navigate(0);
            }

        })


    }


    return (
        <section id="main-content" className="container">
            <Link to={"/add-employee"}>
                <button className="btn btn-primary mb-3">Add employee</button>
            </Link>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">

                        <div className="bootstrap-data-table-panel">
                            <div className="table-responsive">
                                <table id="row-select" className="display table table-borderd table-hover">
                                    <thead>
                                        <tr>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Email</th>
                                            <th>Salary</th>
                                            <th>Function</th>
                                            <th>Hire date</th>
                                            <th scope="col"><span className="ml-5">Actions</span></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            employees.map((employee) => {

                                                return (
                                                    <tr key={employee.id}>
                                                        <td>{employee.firstName}</td>
                                                        <td>{employee.lastName}</td>
                                                        <td>{employee.emailId}</td>
                                                        <td>{employee.salary}</td>
                                                        <td>{employee.functionDescription}</td>

                                                        <td>{employee.hireDate}</td>
                                                        <div className="container d-flex justify-content-center">
                                                            <td><button onClick={() => updateEmployee(employee.id)} className="btn btn-info">Update</button></td>
                                                            <td><button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete</button></td>
                                                        </div>


                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )



}


export default ListEmployeeComponent
