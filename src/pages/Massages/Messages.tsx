import React, {FC, useEffect, useState} from 'react';
import s from './Messages.module.sass'

export const Messages: FC = () => {

    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {

    }, [])


    return (
        <div className={s.chat}>

        </div>
    );
};
