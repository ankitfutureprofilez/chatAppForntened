import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Employee from "../Api/Employee";
import { Toaster, toast } from "react-hot-toast";

function Employees() {
  const [Employeedata, setEmployees] = useState({
    name: "",
    date_of_birth: "",
    email: "",
    joining_date: "",
    qualification: "",
    work_experience: "",
    work_profile: "",
    status: "Active",
    contact_number: "",
    team_lead: "No",
    work_place: "On Site",
    position: "None",
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
    setEmployees({ ...Employeedata, [nameattr]: valueattr });
    console.table(Employeedata);
  };

  const handleFormSubmit = async (e) => {
    const emptyFieldsArray = () => {
      const emptyFields = [];
      for (const key in Employeedata) {
        if (Employeedata[key] === "") {
          emptyFields.push(key);
          toast.error(`${key} can not be empty.`);
        }
      }
      return emptyFields;
    };

    const emptyFields = emptyFieldsArray();
    e.preventDefault();
    if (emptyFields && emptyFields.length) {
      return false;
    }

    const main = new Employee();
    console.log("main", main);
    const fdata = new FormData();
    fdata.append("name", Employeedata.name);
    fdata.append("position", Employeedata.position);
    fdata.append("email", Employeedata.email);
    var dt = new Date(Employeedata.date_of_birth);
    const newdate =
      dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear();
    fdata.append("date_of_birth", newdate);
    var tt = new Date(Employeedata.joining_date);
    const nj =
      tt.getDate() + " " + months[tt.getMonth()] + " " + tt.getFullYear();
    fdata.append("joining_date", nj);
    fdata.append("qualification", Employeedata.qualification);
    fdata.append("work_experience", Employeedata.work_experience);
    fdata.append("status", Employeedata.status);
    fdata.append("work_profile", Employeedata.work_profile);
    fdata.append("contact_number", Employeedata.contact_number);
    fdata.append("team_lead", Employeedata.team_lead);
    fdata.append("work_place", Employeedata.work_place);
    const response = main.EmployeeDetilas(fdata);
    response
      .then((res) => {
        if (res) {
          toast.success(res && res.data && res.data.msg);
        } else {
          toast.error(res && res.data && res.data.msg);
        }
        console.log(fdata);
      })
      .catch((err) => {
        const error = err.errors;
        console.log(error);
      });
  };

  return (
    <>
      <section
        id="login"
        className="d-flex items-center justify-content-center"
      >
        <div className="container m-auto">
          <div>
          <h2 className="mb-4 text-start  ">Employee Data</h2>
          <div className="row">
            <div className="col-md-6 input_container">
              <label className="input_label" for="email_field">
                Name
              </label>
              <input
                placeholder="Name"
                defaultValue={Employeedata.name}
                onChange={handleInputs}
                type="text"
                name="name"
                className="form-control"
              />
            </div>
            <div className="col-md-6 input_container mb-4">
              <label className="input_label" for="email_field">
                Email
              </label>
              <input
                placeholder="Email"
                defaultValue={Employeedata.email}
                onChange={handleInputs}
                name="email"
                type="Email"
                className="form-control"
              />
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="email_field">
                Mobile Number
              </label>
              <input
                placeholder="number"
                name="contact_number"
                defaultValue={Employeedata.contact_number}
                onChange={handleInputs}
                type="number"
                className="form-control"
              />
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="email_field">
                Date Of Birth
              </label>
              <input
                placeholder="date of birth"
                name="date_of_birth"
                defaultValue={Employeedata.date_of_birth}
                onChange={handleInputs}
                type="Date"
                className="form-control"
              />
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="email_field">
                Joining Date
              </label>
              <input
                placeholder="Joining Date"
                name="joining_date"
                defaultValue={Employeedata.joining_date}
                onChange={handleInputs}
                type="Date"
                className="form-control"
              />
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="email_field">
                Education Qualification
              </label>
              <input
                placeholder="Qualification"
                name="qualification"
                defaultValue={Employeedata.qualification}
                onChange={handleInputs}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="email_field">
                Work Experience
              </label>
              <input
                placeholder="Work-Experince"
                name="work_experience"
                defaultValue={Employeedata.work_experience}
                onChange={handleInputs}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="email_field">
                Current Working Profile
              </label>
              <select
                name="Work profile"
                defaultValue={Employeedata.work_profile}
                onChange={handleInputs}
                title="Input title"
                className="form-control"
              >
                <option value="None">None</option>
                <option value="HTML">HTML</option>
                <option value="WordPress">WordPress </option>
                <option value="laravel">Laravel</option>
                <option value="PHP">PHP </option>
                <option value="SEO">SEO </option>
                <option value="shopify">Shopify </option>
                <option value="marketing">Marketing </option>
                <option value="QA">QA</option>
              </select>
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="work_profile_field">
                Past Position
              </label>
              <select
                name="position"
                defaultValue={Employeedata.position}
                onChange={handleInputs}
                title="Input title"
                className="form-control"
              >
                <option value="None">None</option>
                <option value="HTML">HTML</option>
                <option value="WordPress">WordPress </option>
                <option value="laravel">Laravel</option>
                <option value="PHP">PHP </option>
                <option value="SEO">SEO </option>
                <option value="shopify">Shopify </option>
                <option value="marketing">Marketing </option>
                <option value="QA">QA</option>
              </select>
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="work_profile_field">
                Team Leader
              </label>
              <select
                name="team_lead"
                defaultValue={Employeedata.team_lead}
                onChange={handleInputs}
                title="Input title"
                className="form-control"
              >
                <option value="Yes">Yes </option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-md-4 input_container mb-4">
              <label className="input_label" for="work_profile_field">
                Working Type
              </label>
              <select
                name="work_place"
                defaultValue={Employeedata.work_place}
                onChange={handleInputs}
                title="Input title"
                className="form-control"
              >
                <option value="On_site">On_site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="remote">remote</option>
              </select>
            </div>
          </div>
          <button
              title="Sign In"
              type="submit"
              onClick={handleFormSubmit}
              className="btn bg-primary mainbtn"
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
           
            <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
}

export default Employees;
