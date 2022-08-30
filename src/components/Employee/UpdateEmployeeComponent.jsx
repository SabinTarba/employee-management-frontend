import { Link, useNavigate } from 'react-router-dom'
import EmployeeService from '../../services/EmployeeService'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




function UpdateEmployeeComponent() {

    const navigate = useNavigate();
    const params = useParams();
    const idEmployee = params.id;

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        salary: "",
        hireDate: ""

    });



    const handleFirstNameInput = (e) => {
        let updatedValue = { firstName: e.target.value };
        setEmployee(employee => ({
            ...employee,
            ...updatedValue
        }));
    }

    const handleLastNameInput = (e) => {
        let updatedValue = { lastName: e.target.value };
        setEmployee(employee => ({
            ...employee,
            ...updatedValue
        }));
    }

    const handleEmailIdInput = (e) => {
        let updatedValue = { emailId: e.target.value };
        setEmployee(employee => ({
            ...employee,
            ...updatedValue
        }));
    }

    const handleSalaryInput = (e) => {
        let updatedValue = { salary: e.target.value };
        setEmployee(employee => ({
            ...employee,
            ...updatedValue
        }));
    }

    const handleHireDateInput = (e) => {
        let updatedValue = { hireDate: e.target.value };
        setEmployee(employee => ({
            ...employee,
            ...updatedValue
        }));
    }

    const getEmployeeById = (id) => {

        EmployeeService.getEmployeeById(id).then((res) => {

            setEmployee(res.data);

        })

    }

    useEffect(() => {
        getEmployeeById(idEmployee);
    }, [idEmployee])

    const saveEmployee = () => {
        EmployeeService.updateEmployee(employee).then((res) => {
            if (res.status === 200) {
                navigate("/");
                navigate(0);
            }
        })
    }


    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add Employee</h3>
                        <div className="card-body">
                            <form onSubmit={saveEmployee}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="First name" name="firstName" className="form-control" value={employee.firstName} onChange={handleFirstNameInput} required />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Last name" name="lastName" className="form-control" value={employee.lastName} onChange={handleLastNameInput} required />
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" placeholder="Email address" name="emailId" className="form-control" value={employee.emailId} onChange={handleEmailIdInput} required />
                                </div>
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input type="number" placeholder="Salary" name="salary" className="form-control" value={employee.salary} onChange={handleSalaryInput} required />
                                </div>
                                <div className="form-group">
                                    <label>Hire date</label>
                                    <input type="date" placeholder="Date" name="date" className="form-control" value={employee.hireDate} onChange={handleHireDateInput} required />
                                </div>


                                <div className="text-center">
                                    <button className="btn btn-warning ">Save new changes</button>


                                    <Link to={"/employees"}>
                                        <button className="btn btn-danger" style={{ margin: "25px" }}>Cancel</button>
                                    </Link>
                                </div>





                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default UpdateEmployeeComponent

