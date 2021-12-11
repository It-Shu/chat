import React, {FC, KeyboardEvent} from 'react';
import s from "./Chat.module.scss";
import buttonSend from "../../images/buttonSend.png";
import buttonSendGreen from "../../images/buttonSendGreen.png";


type ConnectPageType = {
    username: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    connect: () => void
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const ConnectPage: FC<ConnectPageType> = ({username, onChange, connect, onKeyDown}) => {

    // disabled button if value is empty
    const disabledConnectButton = () => {
        return username === ''
    }

    // change button style while input value is changed
    const imageConnectButton = () => {
        return disabledConnectButton()
            ? <img className={s.imageButton} src={buttonSend} alt=""/>
            : <img className={s.imageButton} src={buttonSendGreen} alt=""/>
    }

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
                    onChange={onChange}
                    type="text"
                    placeholder="Enter your chat name"
                    onKeyDown={onKeyDown}
                />
                <button onClick={connect} disabled={disabledConnectButton()}>
                    {imageConnectButton()}
                </button>
            </div>
        </div>
    );
};
