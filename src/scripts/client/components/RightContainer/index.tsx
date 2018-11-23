import * as React from 'react';
import Header from '../Header';
import Sms from '../Sms/index';
import {RightContainerStyled} from './styles';

const RightContainer = (props: any) => (
    <RightContainerStyled>
        <Header balance={props.balance} />
        <Sms {...props} />
    </RightContainerStyled>
);

export default RightContainer;
