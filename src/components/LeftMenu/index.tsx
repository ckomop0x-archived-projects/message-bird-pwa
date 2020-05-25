import * as React from 'react';
import { Link } from 'react-router-dom';
import { LeftMenuIcon, LeftMenuStyled, Logo, LogOutButton } from './styles';

export interface LeftMenuProps {
  isOffline: boolean;
  onExit(): void;
}

const LeftMenu: React.FunctionComponent<LeftMenuProps> = (props) => {
  console.log('props', props);

  return (
    <LeftMenuStyled>
      <Logo href="/" title="Message Bird Application">
        <img
          src={require('../../../../icons/logo-icon-white.svg')}
          alt="Logo"
        />
      </Logo>
      <div className="center-align">
        {props.isOffline ? (
          <span className="red-text">Offline</span>
        ) : (
          <span className="green-text">Online</span>
        )}
      </div>
      <Link to="/messenger/">
        <LeftMenuIcon>
          <img src={require('../../../../icons/sms.svg')} alt="SMS" />
        </LeftMenuIcon>
      </Link>
      <Link to="/messenger/profile/">
        <LeftMenuIcon>
          <img src={require('../../../../icons/profile.svg')} alt="Profile" />
        </LeftMenuIcon>
      </Link>
      <LogOutButton onClick={props.onExit}>
        <img
          src={require('../../../../icons/sign-out-alt-solid.svg')}
          alt="SMS"
        />
      </LogOutButton>
    </LeftMenuStyled>
  );
};

export default LeftMenu;
