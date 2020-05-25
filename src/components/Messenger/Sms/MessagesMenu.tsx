import * as React from 'react';
import { HeaderMenu, StyledLink } from '../../Header/styles';

const MessagesMenu: React.FunctionComponent = () => {
  return (
    <HeaderMenu>
      <StyledLink to="/messenger" exact={true}>
        All messages
      </StyledLink>
      <StyledLink to="/messenger/inbox" exact={true}>
        Received
      </StyledLink>
      <StyledLink to="/messenger/outbox" exact={true}>
        Sent
      </StyledLink>
      <StyledLink to="/messenger/send" exact={true}>
        New message
      </StyledLink>
    </HeaderMenu>
  );
};

export default MessagesMenu;
