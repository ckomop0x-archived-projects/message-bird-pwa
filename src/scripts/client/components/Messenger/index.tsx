import * as React from 'react';
import LeftMenu from '../LeftMenu/index';
import RightContainer from '../RightContainer/index';

const Messenger = (props: any) => {
    return (
        <>
            <LeftMenu onExit={props.onExit} isOffline={props.isOffline} />
            <RightContainer {...props} />
        </>
    );
};

export default Messenger;
