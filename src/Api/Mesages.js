import { Component } from 'react'
import Api from './Api';
class Messages extends Component {

    //const { loginUser } = useContext(UserContext);
    async MessageChat(e) {
        return Api.post('/chat', e);
    }

    
    async MessageList(receiverId) {
      return Api.get(`/chat/${receiverId}`)
  }
  
    


    render() {
       
        return (
            <div >
              <></>
            </div>
        )
}}

export default Messages;

