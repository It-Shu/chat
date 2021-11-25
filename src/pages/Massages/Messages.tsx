import React, {FC, useEffect, useState} from 'react';
import { Message } from './Message/Message';
import s from './Messages.module.sass'
import {wsChannel} from "../../api/chat-api";

export const Messages: FC = () => {

    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent<any>) => {
            console.log(e.data);
            // let newMessage = (e.data);
            // setMessages((prevMessages) => [...prevMessages,...newMessage])
        })
    }, [])


    return (
        <div className={s.chat}>
            {messages.map((m: any, index) => <Message key={index} message={m} />)}
        </div>
    );
};
