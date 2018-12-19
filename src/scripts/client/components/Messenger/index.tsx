import * as React from 'react';
import LeftMenu from '../LeftMenu/index';
import RightContainer from '../RightContainer/index';

const Messenger = (props: any) => {
    return (
        <>
            <LeftMenu onExit={props.onExit} isOffline={props.isOffline} />
            <RightContainer
                sendNotification={props.sendNotification}
                onRequestPermission={props.onRequestPermission}
                match={props.match}
                isOffline={props.isOffline}
                apiKey={props.apiKey}
                balance={props.balance}
                messagebird={props.messagebird}
                resetUI={props.resetUI}
            />
        </>
    );
};

export default Messenger;
