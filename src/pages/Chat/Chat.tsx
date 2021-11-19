import React from 'react';
import {Messages} from "../Massages/Messages";
import {AddMessage} from "../AddMassage/AddMessage";

export const Chat = () => {
    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    );
};
