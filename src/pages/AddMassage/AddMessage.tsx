import React, {useEffect, useRef, useState} from 'react';
import {v1} from "uuid";
// import s from './AddMessage.module.sass'

const WebSock = () => {
    const [myMessages, setMyMessages] = useState<Array<any>>([]);
    const [serverMessages, setServerMessages] = useState<Array<any>>([]);
    const [value, setValue] = useState<string>('');
    const socket = useRef<WebSocket>()
    const [connected, setConnected] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('')


    function connect() {
        socket.current = new WebSocket('wss://ws.qexsystems.ru')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: v1(),
            }
            socket.current?.send(JSON.stringify(message))
            setMyMessages(prev => [...prev, message])
        }
        socket.current.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data)
            setServerMessages(prev => [...prev, message])
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }


    const sendMessage = () => {
        const currentHour = new Date().getHours().toString()
        const currentMinutes = new Date().getMinutes().toString()
        const currentTime = currentHour + ":" + currentMinutes
        const message = {
            username,
            message: value,
            id: v1(),
            event: 'message',
            time: currentTime
        }
        socket.current?.send(JSON.stringify(message));
        setMyMessages(prev => [...prev, message])
        setValue('')
    }


    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
    }


    return (
        <div className="center">
            {myMessages.map(m => m.username)}
            <div>
                <div className="messages">
                    <div className='message_block'>
                        {myMessages.map(mess =>
                            <div className="message">{mess.username}: {mess.message} {mess.time}</div>
                        )}
                    </div>
                    <div className='server_message_block'>
                        {serverMessages.map(mess =>
                            <div className="server_message">{mess.username}: {mess.message} {mess.time}</div>
                        )}
                    </div>


                </div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send</button>
                </div>

            </div>
        </div>
    );
};

export default WebSock;
