import {Token} from '../../client/index';

export default function setTokenSentToServer(currentToken: Token) {
    if (currentToken) {
        window.localStorage.setItem('sentFirebaseMessagingToken', currentToken);
    } else {
        window.localStorage.removeItem('sentFirebaseMessagingToken');
    }
}
