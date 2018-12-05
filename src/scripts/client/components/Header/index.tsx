import * as React from 'react';
import CurrencySymbol from '../CurrencySymbol/index';
import {Balance, CreditType, HeaderMenu, HeaderStyled, PageTitle, StyledLink, UserBalance} from './styles';

export interface HeaderProps {
    [key: string]: any;
}

const Header = (props: HeaderProps) => {
    const {balance} = props;

    return (
        <HeaderStyled>
            <PageTitle>Messages</PageTitle>
            <HeaderMenu>
                <StyledLink to="/sms" exact={true}>
                    All messages
                </StyledLink>
                <StyledLink to="/sms/inbox" exact={true}>
                    Received
                </StyledLink>
                <StyledLink to="/sms/outbox" exact={true}>
                    Sent
                </StyledLink>
                <StyledLink to="/sms/send" exact={true}>
                    New message
                </StyledLink>
            </HeaderMenu>
            <Balance>
                <CreditType>Balance</CreditType>
                <UserBalance>
                    <div>
                        {balance && balance.type ? <CurrencySymbol currency={balance.type} /> : null}
                        {(balance && balance.amount) || 0}
                    </div>
                </UserBalance>
            </Balance>
        </HeaderStyled>
    );
};

export default Header;
