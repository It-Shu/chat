import React from 'react';
import { Message } from './Message/Message';

export const Messages = () => {

    const messages = [1]
    return (
        <div>
            {messages.map((m: any) => <Message/>  )}
        </div>
    );
};
