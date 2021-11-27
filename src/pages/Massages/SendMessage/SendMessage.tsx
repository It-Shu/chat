import React, {FC} from 'react';
import s from './SendMessage.module.scss'

type SendMessageType = {
    message: string
    time: string
}

export const SendMessage: FC<SendMessageType> = ({message, time}) => {


    return (
        <div className={s.my_message_block}>
            <div className="my_message">
                <div className={s.user_message}>{message}</div>
                <div className={s.send_time}>{time}</div>
            </div>
        </div>
    );
};
