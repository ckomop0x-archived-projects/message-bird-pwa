import styled from 'styled-components';

export const SendForm = styled.form`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`;

export const FormField = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    position: relative;
    min-height: 1px;
    padding-right: ${({theme}) => theme.grid * 2}px;
    padding-left: ${({theme}) => theme.grid * 2}px;

    input {
        width: 100%;
        border-radius: 2px;
        border: 1px solid ${({theme}) => theme.grey8};
        background-image: none;
        padding: 0 2px 0 10px;
        color: ${({theme}) => theme.grey9};
        filter: none;
    }
`;

export const FormTextarea = styled.div`
    flex: 0 0 100%;
    max-width: 100%;
    padding-right: ${({theme}) => theme.grid * 2}px;
    padding-left: ${({theme}) => theme.grid * 2}px;

    textarea {
        width: 100%;
    }
`;

export const SendButton = styled.button`
    background: ${({theme}) => theme.primaryBlue};
    color: #fff;
    border: 0;
    font-weight: 600;
    height: 40px;
    font-family: 'Lota', sans-serif;
    font-size: 16px;
    padding: ${({theme}) => theme.grid}px;
    text-decoration: none;
    float: right;
    border-radius: ${({theme}) => theme.halfGrid}px;

    i {
        font-size: 20px;
        padding-right: ${({theme}) => theme.halfGrid}px;
        color: #ffffff;
    }
`;
