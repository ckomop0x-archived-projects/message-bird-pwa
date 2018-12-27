import * as React from 'react';
import {BalanceResponse, MessageBird} from '../App/index';
import LeftMenu from '../LeftMenu/index';
import RightContainer from '../RightContainer/index';

export interface MessengerProps {
    apiKey: string;
    balance: BalanceResponse | undefined;
    isOffline: boolean;
    messagebird: MessageBird | undefined;
    socket: any;
    error: string;
    message: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    sendNotification(notification?: any): void;
    onDelete(): void;
    onRequestPermission(): void;
    onExit(): void;
}

const Messenger = (props: MessengerProps) => {
    return (
        <>
            <LeftMenu onExit={props.onExit} isOffline={props.isOffline} />
            <RightContainer {...props} />
        </>
    );
};

export default Messenger;
