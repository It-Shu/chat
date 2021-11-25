import React, {FC} from 'react';

type MessageDataType = {
    avatar: string
    firstName: string
    lastName: string
    messageText: string
    sendTime: string
}

export const Message: FC<{message: any}> = ({message}) => {

    const messageData: MessageDataType = {
        avatar: '',
        firstName: '',
        lastName: '',
        messageText: '',
        sendTime: ''

    }

    return (
        <div>
            <img src={message.url} alt="URL"/> <b>{message.name}</b>
            <br/>
            {message.text}
        </div>
    );
};
