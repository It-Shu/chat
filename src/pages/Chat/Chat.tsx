import React from 'react';
import {Messages} from "../Massages/Messages";
import {AddMessages} from "../Massages/AddMassages/AddMessages";
import s from './Chat.module.sass'

export const Chat = () => {

    return (
        <div className={s.chatBlock}>
            <Messages/>
            <AddMessages/>
        </div>
    );
};
