import * as React from 'react';
import {Link} from 'react-router-dom';
import {LeftMenuIcon, LeftMenuStyled, Logo, LogOutButton} from './styles';

export interface LeftMenuProps {
    onExit(): void;
}

const LeftMenu = (props: LeftMenuProps) => {
    return (
        <LeftMenuStyled>
            <Logo href="/" title="Message Bird Application">
                <img src={require('../../../../icons/logo-icon-white.svg')} alt="Logo" />
            </Logo>
            <Link to="/sms/">
                <LeftMenuIcon>
                    <img src={require('../../../../icons/sms.svg')} alt="SMS" />
                </LeftMenuIcon>
            </Link>
            <LogOutButton onClick={props.onExit}>
                <img src={require('../../../../icons/sign-out-alt-solid.svg')} alt="SMS" />
            </LogOutButton>
        </LeftMenuStyled>
    );
};

export default LeftMenu;
