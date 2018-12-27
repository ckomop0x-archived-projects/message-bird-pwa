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

        &.inputError {
            border-color: ${({theme}) => theme.primaryRed};
        }
    }
`;

export const FormTextBlock = styled.div`
    flex: 0 0 100%;
    max-width: 100%;
    padding-right: ${({theme}) => theme.grid * 2}px;
    padding-left: ${({theme}) => theme.grid * 2}px;
`;

export const TextArea = styled.textarea`
    width: 100%;
`;

export const SmsCount = styled.div`
    text-align: right;
`;

export const SendButton = styled.button`
    background: ${({theme}) => theme.primaryBlue};
    color: ${({theme}) => theme.white};
    border: 0;
    font-weight: 600;
    height: ${({theme}) => theme.grid * 5}px;
    font-family: ${({theme}) => theme.secondaryFont};
    font-size: 1rem;
    padding: ${({theme}) => theme.grid}px;
    text-decoration: none;
    float: right;
    border-radius: ${({theme}) => theme.halfGrid}px;

    i {
        font-size: 1.25rem;
        padding-right: ${({theme}) => theme.halfGrid}px;
        color: ${({theme}) => theme.white};
    }
`;

export const ErrorMessage = styled.span`
    color: ${({theme}) => theme.primaryRed};
`;
