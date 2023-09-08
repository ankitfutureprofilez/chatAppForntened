import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Employee from '../Api/Employee';

function Employees() {

    const [Employees, setEmployees] = useState({
        name: '',
        date_of_birth: '',
        email: '',
        joining_date: '',
        qualification: '',
        work_experience: '',
        work_profile: "",
        status: "",
        contact_number: '',
        team_lead: "",
        work_place: ''
    });

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const handleInputs = (e) => {
        let valueattr = e.target.value;
        let nameattr = e.target.name;
        setEmployees({ ...Employees, [nameattr]: valueattr });
        console.table(Employees);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const main = new Employee();
        console.log("main", main)
        const fdata = new FormData();
        fdata.append("name", Employees.name);
        fdata.append("email", Employees.email);
        var dt = new Date(Employees.date_of_birth);
        const newdate = dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear();
        fdata.append("date_of_birth", newdate);
        var tt = new Date(Employees.joining_date);
        const nj = tt.getDate() + " " + months[tt.getMonth()] + " " + tt.getFullYear();
        fdata.append("joining_date", nj);
        fdata.append("qualification", Employees.qualification);
        fdata.append("work_experience", Employees.work_experience);
        fdata.append("status", Employees.status);
        fdata.append("work_profile", Employees.work_profile);
        fdata.append("contact_number", Employees.contact_number);
        fdata.append("team_lead", Employees.team_lead);
        fdata.append("work_place", Employees.work_place);
        const response = main.EmployeeDetilas(fdata);
        response.then((res) => {
            console.log(fdata);
        }).catch((err) => {
            const error = err.errors;
            console.log(error);
        });
    };

    return (
        <>
            <section id="login" className='d-flex items-center justify-content-center'>
                <div className='container m-auto'>
                    <h2 className="mb-4 text-start  ">Employee Data</h2>
                    <div className='row'>
    
                        <div className="col-md-6 input_container  " >
                            <label className="input_label" for="email_field">Name</label>
                            <input placeholder="Name"
                                name='name'
                                defaultValue={Employee.name}
                                onChange={handleInputs}
                                
                                type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 input_container mb-4">
                            <label className="input_label" for="email_field">Email</label>
                            <input placeholder="Email"
                                defaultValue={Employee.email}
                                onChange={handleInputs}
                                name="email"
                                    type="Email" className="form-control" />
                        </div>
            
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="email_field">Mobile Number</label>
                            <input placeholder="number"
                                name="contact_number"
                                defaultValue={Employee.contact_number}
                                onChange={handleInputs}
                                    type="number" className="form-control" />
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="email_field">Date Of Birth</label>
                            <input placeholder="date of birth"
                                name="date_of_birth"
                                defaultValue={Employee.date_of_birth}
                                onChange={handleInputs}
                                    type="Date" className="form-control" />
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="email_field">Joining Date</label>
                            <input placeholder="Joining Date"
                                name="joining_date"
                                defaultValue={Employees.joining_date}
                                onChange={handleInputs}
                                    type="Date" className="form-control" />
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="email_field">Qualification</label>
                            <input placeholder="Qualification"
                                name="qualification"
                                defaultValue={Employee.qualification}
                                onChange={handleInputs}
                                    type="text" className="form-control" />
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="email_field">Work-Experince</label>
                            <input placeholder="Work-Experince"
                                name="work_experience"
                                defaultValue={Employee.work_experience}
                                onChange={handleInputs}
                                    type="text" className="form-control" />
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="email_field">Work-Profile</label>
                            <input placeholder="Work-Profile"
                                name="work_profile"
                                defaultValue={Employee.work_profile}
                                onChange={handleInputs}
                                    type="text" className="form-control" />
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="work_profile_field">Status</label>
                            <select name="status"
                                defaultValue={Employee.status}
                                onChange={handleInputs}
                                title="Input title" className="form-control">
                                <option value='..on Choose'>..on choose</option>
                                <option value="Active">Active </option>
                                <option value="In-Active">In-Active</option>
                            </select>
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="work_profile_field">Team Leader </label>
                            <select name="team_lead"
                                defaultValue={Employee.team_lead}
                                onChange={handleInputs}
                                title="Input title" className="form-control">
                                <option value='..on Choose'>..on choose</option>
                                <option value="Yes">Yes </option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-4 input_container mb-4">
                            <label className="input_label" for="work_profile_field">Work_place</label>
                            <select
                                name="work_place"
                                defaultValue={Employee.work_place}
                                onChange={handleInputs}
                                title="Input title" className="form-control">
                                <option value='..on Choose'>..on choose</option>
                                <option value="On_site">On_site</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="remote">remote</option>
                            </select>
                        </div>
                        <button title="Sign In"
                            type='submit'
                            onClick={handleFormSubmit}
                            className="btn bg-primary mainbtn">
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Employees;