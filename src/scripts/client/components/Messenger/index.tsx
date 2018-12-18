import * as React from 'react';
import LeftMenu from '../LeftMenu/index';
import RightContainer from '../RightContainer/index';

const Messenger = (props: any) => {
    return (
        <>
            <LeftMenu onExit={props.onExit} isOffline={props.isOffline} />
            <RightContainer
                match={props.match}
                isOffline={props.isOffline}
                apiKey={props.apiKey}
                balance={props.balance}
                messagebird={props.messagebird}
            />
        </>
    );
};

export default Messenger;