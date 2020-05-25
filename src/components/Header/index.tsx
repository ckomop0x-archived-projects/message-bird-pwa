import * as React from 'react';
import { BalanceResponse } from '../App/types';
import CurrencySymbol from '../CurrencySymbol/index';
import {
  Balance,
  CreditType,
  HeaderStyled,
  PageTitle,
  UserBalance
} from './styles';

export interface HeaderProps {
  menu?: React.ReactNode;
  title: string;
  balance: BalanceResponse | undefined;
}

const Header = (props: HeaderProps) => {
  const { balance } = props;

  return (
    <HeaderStyled>
      <PageTitle>{props.title}</PageTitle>
      {props.menu ? props.menu : null}
      <Balance>
        <CreditType>Balance</CreditType>
        <UserBalance>
          <div>
            {balance && balance.type ? (
              <CurrencySymbol currency={balance.type} />
            ) : null}
            {(balance && balance.amount) || 0}
          </div>
        </UserBalance>
      </Balance>
    </HeaderStyled>
  );
};

export default Header;
