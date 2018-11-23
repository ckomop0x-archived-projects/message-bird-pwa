import styled from 'styled-components';

export const LeftMenuStyled = styled.div`
    background: #001234;
    width: ${({theme}) => theme.grid * 10}px;
    display: flex;
    flex-direction: column;
`;

export const Logo = styled.a`
    text-decoration: none;
    line-height: 32px;
    vertical-align: top;
    display: inline-block;
    margin-bottom: 45px;
    padding: 21px 15px 15px;
    text-align: center;

    img {
        width: ${({theme}) => theme.grid * 4}px;
        line-height: ${({theme}) => theme.grid * 4}px;
        vertical-align: top;
        display: inline-block;
    }

    span {
        font-family: ${({theme}) => theme.secondaryFont};
        color: #ffffff;
        font-weight: bold;
        padding-left: ${({theme}) => theme.grid * 2}px;
        font-size: 1.75rem;
        line-height: ${({theme}) => theme.grid * 4}px;
        vertical-align: top;
        display: inline-block;
    }
`;

export const LeftMenuIcon = styled.div`
    text-align: center;
    padding: ${({theme}) => theme.grid}px;
`;

export const LogOutButton = styled.button`
    background: none;
    color: white;
    text-align: center;
    white-space: nowrap;
    border: 0;
    cursor: pointer;

    img {
        width: ${({theme}) => theme.grid * 3}px;
    }
`;
