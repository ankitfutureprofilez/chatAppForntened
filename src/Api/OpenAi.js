import { Component } from 'react'
import Api from './Api';
class OpenAi extends Component {

    //const { loginUser } = useContext(UserContext);
    async OpenAiChat(e) {
        return Api.post('/chain', e);
    }


    async Views(e) {
        return Api.post('/pdf', e);
    }

    
//     async ListMessage(receiverId) {
//       return Api.get(`/chat/${receiverId}`)
//   }
  
    


    render() {
       
        return (
            <div >
              <></>
            </div>
        )
}}

export default OpenAi;