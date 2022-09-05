import { Link, useNavigate } from 'react-router-dom'
import EmployeeService from '../../services/EmployeeService'
import { useEffect, useState } from 'react';




function CreateEmployeeComponent() {

    const navigate = useNavigate();

    const [functions, setFunctions] = useState([]);

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        salary: "",
        hireDate: "",
        function: ""

    });


    const getFunctions = () => {
        EmployeeService.getFunctions().then((res) => {
            setFunctions(res.data);
        })
    }

    useEffect(() => {
        getFunctions();
    }, [])



    const handleEmployeeForm = (e) => {
        setEmployee(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const saveEmployee = (e) => {

        e.preventDefault();

        EmployeeService.createEmployee(employee).then(() => {
            navigate('/employees');
        })

    }



    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 py-3">
                        <h3 className="text-center">Add Employee</h3>
                        <div className="card-body">
                            <form onSubmit={saveEmployee}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="First name" name="firstName" className="form-control" value={employee.firstName} onChange={handleEmployeeForm} required />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Last name" name="lastName" className="form-control" value={employee.lastName} onChange={handleEmployeeForm} required />
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" placeholder="Email address" name="emailId" className="form-control" value={employee.emailId} onChange={handleEmployeeForm} required />
                                </div>
                                <div className="form-group">
                                    <label>Function</label>
                                    <select className="form-control" value={employee.function} onChange={handleEmployeeForm} required name="function">
                                        <option key={0} value={0}>Select function</option>
                                        {
                                            functions.map((funct) => {
                                                return (
                                                    <option key={funct.id} value={funct.id}>{funct.description}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input type="number" placeholder="Salary" name="salary" className="form-control" value={employee.salary} onChange={handleEmployeeForm} required />
                                </div>
                                <div className="form-group">
                                    <label>Hire date</label>
                                    <input type="date" placeholder="Date" name="hireDate" className="form-control" value={employee.hireDate} onChange={handleEmployeeForm} required />
                                </div>


                                <div className="text-center">
                                    <button type="submit" className="btn btn-success ">Save</button>


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

export default CreateEmployeeComponent

