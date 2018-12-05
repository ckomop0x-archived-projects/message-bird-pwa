import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const HeaderStyled = styled.header`
    padding: ${({theme}) => theme.grid * 2}px;
    width: 100%;
    flex-shrink: 0;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
        flex-direction: row;
    }
`;

export const UserBalance = styled.div`
    color: #ff756c;
`;

export const Balance = styled.div`
    text-align: center;
`;

export const CreditType = styled.div`
    font-size: 10px;
    line-height: 15px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 800;
    text-align: center;
    color: #8996b0;
`;

export const PageTitle = styled.h1`
    text-align: center;

    @media (min-width: 600px) {
        margin: 0 ${({theme}) => theme.grid * 4}px 0 0;
    }
`;

export const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (min-width: 600px) {
        flex-direction: row;
    }

    .active {
        color: ${({theme}) => theme.grey1};
        background-color: ${({theme}) => theme.grey2};
    }
`;

export const StyledLink = styled(NavLink)`
    white-space: nowrap;
    text-decoration: none;
    display: flex;
    align-items: center;
    border-radius: ${({theme}) => theme.halfGrid}px;
    padding: 1px 15px;
    color: ${({theme}) => theme.grey3};
    font-size: 14px;
    font-weight: 600;
    line-height: ${({theme}) => theme.grid * 4}px;
    height: ${({theme}) => theme.grid * 4}px;

    &.active {
        color: ${({theme}) => theme.grey1};
        background-color: ${({theme}) => theme.grey2};
    }
`;
