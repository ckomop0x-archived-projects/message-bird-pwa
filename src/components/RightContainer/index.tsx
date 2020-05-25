import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { BalanceResponse, MessageBird } from '../App/types';
import Profile from '../Messenger/Profile/index';
import Sms from '../Messenger/Sms/Sms';
import { RightContainerStyled } from './styles';

export interface RightContainerProps {
  apiKey: string;
  balance: BalanceResponse | undefined;
  socket: any;
  isOffline: boolean;
  messagebird: MessageBird | undefined;
  error: string;
  message: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  sendNotification({}): void;
  onDelete(): void;
  onRequestPermission(): void;
}

export interface MessengerRouteParams {
  filter: string;
}

const RightContainer = (props: RightContainerProps) => {
  return (
    <RightContainerStyled>
      <Switch>
        <Route
          path="/messenger/profile"
          exact={true}
          render={() => (
            <Profile
              balance={props.balance}
              error={props.error}
              onSubmit={props.onSubmit}
              onDelete={props.onDelete}
              message={props.message}
              onRequestPermission={props.onRequestPermission}
            />
          )}
        />
        <Route
          path="/messenger/:filter?"
          render={({ match }: RouteComponentProps<MessengerRouteParams>) => (
            <Sms
              filter={(match && match.params.filter) || ''}
              socket={props.socket}
              balance={props.balance}
              apiKey={props.apiKey}
              isOffline={props.isOffline}
              messagebird={props.messagebird}
              sendNotification={props.sendNotification}
            />
          )}
        />
      </Switch>
    </RightContainerStyled>
  );
};

export default RightContainer;
