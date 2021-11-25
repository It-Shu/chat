import React, {useState} from 'react';
import s from './AddMessage.module.sass'
import {wsChannel} from "../../../api/chat-api";

export const AddMessage = () => {

    const [message, setMessage] = useState<string>('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }


    return (
        <div className={s.sentBlock}>
            <div>
                <textarea className={s.textArea} placeholder={'Enter your message...'} onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button className={s.button} onClick={sendMessage}>Sent</button>
            </div>
        </div>
    );
};
