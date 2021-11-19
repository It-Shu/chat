import React from 'react';

export const Message = () => {

    const message = {
        url: 'https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x/30',
        author: 'Dad',
        text: 'Hello'
    }

    return (
        <div>
            <img src={message.url} alt="URL"/> <b>{message.author}</b>
            <br/>
            {message.text}
<hr/>
        </div>
    );
};
