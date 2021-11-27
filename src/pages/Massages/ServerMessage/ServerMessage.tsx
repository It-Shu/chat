import React, {FC} from 'react';
import s from './ServerMessage.module.scss'

type ServerMessageType = {
    avatar: string
    username: string
    message: string
    time: string
}

export const ServerMessage: FC<ServerMessageType> = ({avatar, username, message, time}) => {

    return (
        <div className={s.block_message}>
            <img src={avatar} className={s.avatar} alt='avatar'/>
            <div className={s.server_message_block}>
                <div className={s.user}>{username}</div>
                <div className={s.user_message}>{message}</div>
                <div className={s.server_send_time}>{time}</div>
            </div>
        </div>
    );
};
