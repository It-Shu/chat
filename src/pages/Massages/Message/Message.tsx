import React, {FC} from 'react';

type MessageDataType = {
    avatar?: string
    username: string
    message: string
    time: string
    userId: string
}

export const Message: FC<MessageDataType> = ({avatar, message, time, username}) => {


    return (
        <div>
            <div>
            <div className="my_message">
                <div>
                    <div className='user'>{username}:</div>
                    <div className='user-message'>{message}</div>
                </div>
            </div>
            <img src={avatar} className='avatar'/>
        </div>

             <div className="server_message_block">
            <img src={avatar} className='avatar'/>
            <div className="server_message">
                <div>
                    <div className='user'>{username}:</div>
                    <div className='user-message'>{message}</div>
                </div>
            </div>

        </div>
        </div>
    );
};
