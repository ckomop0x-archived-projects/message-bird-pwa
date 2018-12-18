import {isTokenSentToServer} from './is-token-sent-to-server';
import setTokenSentToServer from './set-token-sent-to-server';

export default function sendTokenToServer(currentToken: any) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Sending token to server...');
        // send current token to server
        // $.post(url, {token: currentToken});
        setTokenSentToServer(currentToken);
    } else {
        console.log("Token already sent to server so won't send it again unless it changes");
    }
}
