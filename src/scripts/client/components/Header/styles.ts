import styled from 'styled-components';

export const HeaderStyled = styled.header`
    padding: ${({theme}) => theme.grid * 2}px;
    width: 100%;
    flex-shrink: 0;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;

    h1 {
        text-align: center;

        @media (min-width: 600px) {
            margin: 0 ${({theme}) => theme.grid * 4}px 0 0;
        }
    }

    @media (min-width: 600px) {
        flex-direction: row;
    }

    .ballance {
        text-align: center;

        .credit-type {
            font-size: 10px;
            line-height: 15px;
            letter-spacing: 1px;
            text-transform: uppercase;
            font-weight: 800;
            text-align: center;
            color: #8996b0;
        }

        .critical {
            color: #ff756c;
        }
    }
`;

export const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (min-width: 600px) {
        flex-direction: row;
    }

    .nav-item {
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
    }

    .active {
        color: ${({theme}) => theme.grey1};
        background-color: ${({theme}) => theme.grey2};
    }
`;
