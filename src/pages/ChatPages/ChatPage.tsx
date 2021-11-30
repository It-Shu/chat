import React, {FC, KeyboardEvent} from 'react';
import s from "./Chat.module.scss";
import buttonSend from "../../images/buttonSend.png";
import buttonSendGreen from "../../images/buttonSendGreen.png";
import {SendMessage} from "../Massages/SendMessage/SendMessage";
import {ServerMessage} from "../Massages/ServerMessage/ServerMessage";
import SuperInputText from "../../Ui/Input";
import SuperButton from "../../Ui/Button";

type ChatPageType = {
    value: string
    userId: string
    username: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    sendMessage: () => void
    setValue: () => void
    myMessages: string[]
}

export const ChatPage: FC<ChatPageType> = (
    {
        value,
        userId,
        username,
        myMessages,
        onChange,
        sendMessage,
        setValue
    }
) => {

    const disabledSendButton = () => {
        return value === ''
    }

    const imageSendButton = () => {
        return disabledSendButton()
            ? <img className={s.imageButton} src={buttonSend} alt=""/>
            : <img className={s.imageButton} src={buttonSendGreen} alt=""/>
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


    return (
        <div className={s.container}>
            <div className={s.header}>
                <div>{username}</div>
            </div>
            <div className={s.body}>
                {myMessages.map(mapMessage)}
            </div>
            <div className={s.footer}>
                <input value={value} onChange={onChange} type="text"
                       // onKeyPress={onEnter}
                       placeholder='Enter text message...'/>
                <button className={s.button} onClick={sendMessage} disabled={disabledSendButton()}>
                    {imageSendButton()}
                </button>
                <SuperInputText value={value} onChangeText={setValue} onEnter={sendMessage}/>
                <SuperButton onClick={sendMessage}/>
            </div>
        </div>
    );
};
