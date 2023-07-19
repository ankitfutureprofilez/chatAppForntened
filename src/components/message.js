import { useEffect } from "react";
import { useState } from "react";

function Chatmessage({ socket }) {

    const [Currentmessage, setCurrentmessage] = useState("")
    const [MessageList, setMessageList] = useState([]);
    function handelform(e) {
        e.preventDefault();
        if (Currentmessage !== "") {
            const mesagedata = {
                //  password: password,
                //  username: username,
                record: Currentmessage,
                time: new Date(Date.now()).getHours + ":" + new Date(Date.now()).getMinutes(),
            };
            console.log(mesagedata,Currentmessage)
            socket.emit("send-message", mesagedata)
            setMessageList((MessageList) => [...MessageList, mesagedata])

        }
    };


    useEffect(() => {
        socket.on("recive-message", (data) => {
            setMessageList((MessageList) => [...MessageList, data])
        })
    }, [socket]);
    return (
        <section id="message">
            <div className="chat-header"></div>
            <div className="chat-body">
                {MessageList.map((res) => (
                    <div className="message" >
                        <div key={res._id}>{res.record}</div>
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input type="text"
                    placeholder="Message"
                    value={Currentmessage}
                    onChange={(e)=>{setCurrentmessage(e.target.value)}} />
                <button onSubmit={handelform}>Send</button>
            </div>
        </section>
    );
}

export default Chatmessage;
//id={username === res.author ? "you" : "ohter"}