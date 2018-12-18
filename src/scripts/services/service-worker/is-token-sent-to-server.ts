import {Token} from '../../client/index';

export function isTokenSentToServer(currentToken: Token): boolean {
    return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken;
}
