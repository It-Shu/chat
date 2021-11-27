import React, {useRef, useState} from 'react';
import {v1} from "uuid";
import s from './Chat.module.scss'
import buttonSend from '../../images/buttonSend.png'
import buttonSendGreen from '../../images/buttonSendGreen.png'
import {SendMessage} from "../Massages/SendMessage/SendMessage";
import {ServerMessage} from "../Massages/ServerMessage/ServerMessage";
import {ConnectPage} from "../ConnectPage/ConnectPage";

const Chat = () => {
    const [myMessages, setMyMessages] = useState<Array<any>>([]);
    const [userId, setUserId] = useState<string>('')
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
                userId: v1(),
            }
            socket.current?.send(JSON.stringify(message))
            // setMyMessages(prev => [...prev, message])
            setUserId(message.userId)
        }
        socket.current.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data)
            setMyMessages(prev => [...prev, message])
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }


    const sendMessage = async () => {
        const currentHour = new Date().getHours().toString()
        const currentMinutes = new Date().getMinutes()
        const minutesWithO = () => {
            return currentMinutes < 10 ? '0' + currentMinutes.toString() : currentMinutes.toString()
        }

        const currentTime = currentHour + ":" + minutesWithO()

        const message = {
            username,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSgYDB6AplaYZG3mdUygpPwCZCFlXQ8BbIw&usqp=CAU',
            message: value,
            id: v1(),
            userId: userId,
            event: 'message',
            time: currentTime
        }
        socket.current?.send(JSON.stringify(message));
        setMyMessages(prev => [...prev, message])
        setValue('')
    }

    const mapMessage = (mess: string | any) => {
        return userId === mess.userId
            ? <SendMessage
                key={mess.id}
                message={mess.message}
                time={mess.time}/>

            : <ServerMessage
                key={mess.id}
                avatar={mess.avatar}
                username={mess.username}
                message={mess.message}
                time={mess.time}/>

    }


    // const disabledConnectButton = () => {
    //     return username === ''
    // }

    const disabledSendButton = () => {
        return value === ''
    }

    const imageSendButton = () => {
        return disabledSendButton()
            ? <img className={s.imageButton} src={buttonSend} alt=""/>
            : <img className={s.imageButton} src={buttonSendGreen} alt=""/>
    }

    // const imageConnectButton = () => {
    //     return disabledConnectButton()
    //         ? <img className={s.imageButton} src={buttonSend} alt=""/>
    //         : <img className={s.imageButton} src={buttonSendGreen} alt=""/>
    // }

    if (!connected) {
        return (
            <ConnectPage connect={connect} username={username} onChange={e => setUsername(e.target.value)}/>
            // <div className={s.container}>
            //     <div className={s.header}>
            //         <h1>Chat</h1>
            //     </div>
            //     <div className={s.body}>
            //
            //     </div>
            //     <div className={s.footer}>
            //         <input
            //             value={username}
            //             onChange={e => setUsername(e.target.value)}
            //             type="text"
            //             placeholder="Enter your chat name"/>
            //         <button onClick={connect} disabled={disabledConnectButton()}>
            //             {imageConnectButton()}
            //         </button>
            //     </div>
            // </div>
        )
    }


    return (
        <div className={s.container}>
            <div className={s.header}>
                <div>{username}</div>
            </div>
            <div className={s.body}>
                {myMessages.map(mapMessage)}
            </div>
            <div className={s.footer}>
                <input value={value} onChange={e => setValue(e.target.value)} type="text"
                       placeholder='Enter text message...'/>
                <button className={s.button} onClick={sendMessage} disabled={disabledSendButton()}>
                    {imageSendButton()}
                </button>
            </div>
        </div>
    );
};

export default Chat;
