import { Component } from 'react'
import Api from './Api';
class OpenAi extends Component {

    //const { loginUser } = useContext(UserContext);
    async OpenAiChat(e) {
        return Api.post('/findAnswer', e);
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