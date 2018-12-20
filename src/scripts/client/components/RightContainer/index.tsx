import * as React from 'react';
import {match, Route, Switch} from 'react-router';
import {BalanceResponse} from '../App/index';
import Profile from '../Messenger/Profile/index';
import Sms from '../Messenger/Sms/sms';
import {RightContainerStyled} from './styles';

export interface RightContainerProps {
    [key: string]: any;
    match?: match<{}> | null;
    apiKey: string;
    balance?: BalanceResponse;
    messagebird: any;
    isOffline: boolean;
    resetUI: () => void;
    sendNotification: () => void;
}

const RightContainer = (props: RightContainerProps) => {
    return (
        <RightContainerStyled>
            <Switch>
                <Route path="/messenger/profile" exact={true} render={() => <Profile {...props} />} />
                <Route
                    path="/messenger/:filter?"
                    render={({match}: any) => {
                        const {params} = match;
                        return <Sms filter={params.filter} {...props} />;
                    }}
                />
            </Switch>
        </RightContainerStyled>
    );
};

export default RightContainer;
