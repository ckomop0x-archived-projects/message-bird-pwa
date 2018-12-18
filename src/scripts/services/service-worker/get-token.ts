import * as firebase from 'firebase';
import {Token} from '../../client/index';
import sendTokenToServer from './send-token-to-server';
import setTokenSentToServer from './set-token-sent-to-server';
import {showError} from './show-error';
import updateUIForPushEnabled from './update-ui-for-push-enabled';
import updateUIForPushPermissionRequired from './update-ui-for-push-permission-required';

export interface GetTokenOptions {
    token: JQuery<HTMLElement>;
    bt_register: JQuery<HTMLElement>;
    bt_delete: JQuery<HTMLElement>;
    form: JQuery<HTMLElement>;
    massage_row: JQuery<HTMLElement>;
    info: JQuery<HTMLElement>;
}

export default function getToken(messaging: firebase.messaging.Messaging, getTokenOptions: GetTokenOptions) {
    const {token, bt_register, bt_delete, form, massage_row, info} = getTokenOptions;

    messaging
        .requestPermission()
        .then(async () => {
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            try {
                const currentToken: Token = await messaging.getToken();

                if (currentToken) {
                    sendTokenToServer(currentToken);
                    updateUIForPushEnabled(currentToken, {token, bt_register, bt_delete, form});
                } else {
                    showError('No Instance ID token available. Request permission to generate one', {});
                    updateUIForPushPermissionRequired({
                        token,
                        bt_register,
                        bt_delete,
                        form,
                        massage_row,
                        info
                    });
                    setTokenSentToServer(null);
                }
            } catch (error) {
                showError('An error occurred while retrieving token', {error});
                updateUIForPushPermissionRequired({token, bt_register, bt_delete, form, massage_row, info});
                setTokenSentToServer(null);
            }
        })
        .catch((error) => {
            showError('Unable to get permission to notify', {error});
        });
}
