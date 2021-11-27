import React, {useRef, useState} from 'react';
import {v1} from "uuid";
import s from './AddMessage.module.scss'
import buttonSend from '../../images/buttonSend.png'
import buttonSendGreen from '../../images/buttonSendGreen.png'

const AddMessage = () => {
    const [myMessages, setMyMessages] = useState<Array<any>>([]);
    // const [serverMessages, setServerMessages] = useState<Array<any>>([]);
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
        const currentMinutes = new Date().getMinutes().toString()
        const currentTime = currentHour + ":" + currentMinutes

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
            ? <div key={mess.id} className={s.my_message_block}>
                <div className="my_message">
                    {/*<div className='user'>{mess.username}</div>*/}
                    <div className={s.user_message}>{mess.message}</div>
                    <div className={s.send_time}>{mess.time}</div>
                </div>
                {/*<img src={mess.avatar} className='avatar'/>*/}
            </div>

            :
            <div key={mess.id} className={s.block_message}>
                <img src={mess.avatar} className={s.avatar}/>
                <div className={s.server_message_block}>
                    <div className={s.user}>{mess.username}</div>
                    <div className={s.user_message}>{mess.message}</div>
                    <div className={s.server_send_time}>{mess.time}</div>
                </div>
            </div>
    }


    const disabledEnterButton = () => {
        return username === ''
    }
    const disabledSendButton = () => {
        return value === ''
    }

    const imageSendButton = () => {
        return disabledSendButton()
            ? <img className={s.imageButton} src={buttonSend} alt=""/>
            : <img className={s.imageButton} src={buttonSendGreen} alt=""/>
    }

    const imageEnterButton = () => {
        return disabledEnterButton()
            ? <img className={s.imageButton} src={buttonSend} alt=""/>
            : <img className={s.imageButton} src={buttonSendGreen} alt=""/>
    }

    if (!connected) {
        return (
            <div className={s.container}>
                <div className={s.header}>
                    <h1>Chat</h1>
                </div>
                <div className={s.body}>

                </div>
                <div className={s.footer}>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Enter your chat name"/>
                    <button onClick={connect} disabled={disabledEnterButton()}>
                        {imageEnterButton()}
                    </button>
                </div>
            </div>
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

export default AddMessage;
