import { Component } from 'react'
import Api from './Api';
class Messages extends Component {

    async MessageChat(e) {
        return Api.post('/chat', e);
    }

    async MessageChatShow() {
        return Api.get('/chat');
    }


    render() {
       
        return (
            <div >
              <></>
            </div>
        )
}}

export default Messages;

