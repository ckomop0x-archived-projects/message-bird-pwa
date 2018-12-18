import * as React from 'react';
import Header from '../../Header/index';
import {RightContainerProps} from '../../RightContainer/index';
import Dashboard from './Dashboard/index';
import MessagesMenu from './MessagesMenu';
import Send from './Send/index';

export interface SmsProps extends RightContainerProps {
    filter: string;
}

const Sms = (props: SmsProps) => {
    return (
        <>
            <Header title="Messages" menu={<MessagesMenu />} balance={props.balance} />
            {props.filter === 'send' ? <Send {...props} /> : <Dashboard {...props} />}
        </>
    );
};

export default Sms;
