import React from 'react';
import MessagesAside from './components/MessagesAside';
import Chat from './components/Chat';

export default function Messages() {
    return (
        <div className='nestfy__messages'>
            <MessagesAside />
            <Chat />
        </div>
    )
}
