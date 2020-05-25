import * as React from 'react';
import { BalanceResponse, MessageBird } from '../../App/types';
import Header from '../../Header/index';
import Dashboard from './Dashboard/index';
import MessagesMenu from './MessagesMenu';
import Send from './Send/index';

export interface SmsProps {
  apiKey: string;
  balance: BalanceResponse | undefined;
  filter: string;
  socket: any;
  isOffline: boolean;
  messagebird: MessageBird | undefined;
  sendNotification({}): void;
}

const Sms = (props: SmsProps) => {
  const {
    apiKey,
    filter,
    sendNotification,
    socket,
    balance,
    isOffline,
    messagebird
  } = props;

  return (
    <>
      <Header title="Messages" menu={<MessagesMenu />} balance={balance} />
      {props.filter === 'send' ? (
        <Send isOffline={isOffline} messagebird={messagebird} />
      ) : (
        <Dashboard
          filter={filter}
          // sendNotification={sendNotification}
          socket={socket}
          apiKey={apiKey}
        />
      )}
    </>
  );
};

export default Sms;
