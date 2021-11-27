import React, {FC} from 'react';
import s from "../Chat/Chat.module.scss";
import buttonSend from "../../images/buttonSend.png";
import buttonSendGreen from "../../images/buttonSendGreen.png";


type ConnectPage = {
    username: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    connect: () => void
}

export const ConnectPage: FC<ConnectPage> = ({username, onChange, connect}) => {

    const disabledConnectButton = () => {
        return username === ''
    }

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
                    placeholder="Enter your chat name"/>
                <button onClick={connect} disabled={disabledConnectButton()}>
                    {imageConnectButton()}
                </button>
            </div>
        </div>
    );
};
