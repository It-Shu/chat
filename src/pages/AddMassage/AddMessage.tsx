import React, {useRef, useState} from 'react';

export const AddMessage = () => {

    const [messages, setMessages] = useState<Array<any>>([]);
    const [value, setValue] = useState('');
    const socket = useRef<WebSocket>()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')

    function connect() {
        socket.current = new WebSocket('wss://ws.qexsystems.ru')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current?.send(JSON.stringify(message))
        }
        socket.current.onmessage = (e: MessageEvent) => {
            const message = JSON.parse(e.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {

        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current?.send(JSON.stringify(message))
        setValue('')
    }
    if (!connected) {
        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your Name'
                    />
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <div>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div>
                    {messages.map((mess) => (
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div>User {mess.username} is connected</div>
                                : <div>{mess.username}: {mess.message}</div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
