import React, {useRef, useState} from 'react';
import {v1} from "uuid";
import {ChatPage} from '../ChatPages/ChatPage';
import {ConnectPage} from "../ChatPages/ConnectPage";

const Chat = () => {
    const [myMessages, setMyMessages] = useState<Array<any>>([]);
    const [userId, setUserId] = useState<string>('')
    const [value, setValue] = useState<string>('');
    const socket = useRef<WebSocket>()
    const [connected, setConnected] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('')


  // const manifest = {
  //       "name": "chat_pwa",
  //       "short_name": "ch_pwa",
  //       "theme_color": "#81ba7c",
  //       "background_color": "#69a2cf",
  //       "display": "browser",
  //       "start_url": "."
  //   }

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




    return (!connected)
        ? <ConnectPage
            connect={connect}
            username={username}
            onChange={e => setUsername(e.target.value)}/>

        :  <ChatPage
            value={value}
            userId={userId}
            username={username}
            myMessages={myMessages}
            onChange={e => setValue(e.target.value)}
            sendMessage={sendMessage}/>
};

export default Chat;
