import React, {FC, useEffect, useState} from 'react';
import { Message } from './Message/Message';
import s from './Messages.module.sass'
import {wsChannel} from "../../api/chat-api";

export const Messages: FC = () => {

    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {

    }, [])


    return (
        <div className={s.chat}>
            {messages.map((m: any, index) => <Message key={index} message={m} />)}
        </div>
    );
};
