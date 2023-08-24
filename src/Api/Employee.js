import { Component } from 'react'
import Api from './Api';
class Employee extends Component {

    //const { loginUser } = useContext(UserContext);
    async EmployeeDetilas(e) {
        return Api.post('/employee', e);
    }

    render() {
       
        return (
            <div >
              <></>
            </div>
        )
}}

export default Employee;