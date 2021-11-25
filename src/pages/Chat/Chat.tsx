import React from 'react';
import {Messages} from "../Massages/Messages";
import {AddMessage} from "../Massages/AddMassage/AddMessage";
import s from './Chat.module.sass'

export const Chat = () => {

    return (
        <div className={s.chatBlock}>
            <Messages/>
            <AddMessage/>
        </div>
    );
};
