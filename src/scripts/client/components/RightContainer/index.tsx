import * as React from 'react';
import {match} from 'react-router';
import {BalanceResponse} from '../App/index';
import Header from '../Header';
import Sms from '../Sms/index';
import {RightContainerStyled} from './styles';

export interface RightContainerProps {
    match?: match<any>;
    apiKey: string;
    balance?: BalanceResponse;
    messagebird: any;
}

const RightContainer = (props: RightContainerProps) => {
    return (
        <RightContainerStyled>
            <Header balance={props.balance} />
            <Sms {...props} />
        </RightContainerStyled>
    );
};

export default RightContainer;
