import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, RouteComponentProps} from 'react-router-dom';
import getToken from '../services/service-worker/get-token';
import resetUI from '../services/service-worker/reset-ui';
import sendNotification from '../services/service-worker/send-notification';
import sendTokenToServer from '../services/service-worker/send-token-to-server';
import setTokenSentToServer from '../services/service-worker/set-token-sent-to-server';
import {showError} from '../services/service-worker/show-error';
import updateUIForPushEnabled from '../services/service-worker/update-ui-for-push-enabled';
import updateUIForPushPermissionRequired from '../services/service-worker/update-ui-for-push-permission-required';
import App from './components/App';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import * as serviceWorker from './serviceWorker';

const Application = () => <Route render={(props: RouteComponentProps) => <App {...props} />} />;

ReactDOM.render(
    <Router>
        <Application />
    </Router>,
    document.getElementById('root')
);

firebase.initializeApp({
    messagingSenderId: '607900386765'
});

export type Token = string | null;

const bt_register: JQuery<HTMLElement> = $('#register');
const bt_delete: JQuery<HTMLElement> = $('#delete');
const token: JQuery<HTMLElement> = $('#token');
const form: JQuery<HTMLElement> = $('#notification');
const massage_id: JQuery<HTMLElement> = $('#massage_id');
const massage_row: JQuery<HTMLElement> = $('#massage_row');
const info: JQuery<HTMLElement> = $('#info');
const info_message: JQuery<HTMLElement> = $('#info-message');
const alert: JQuery<HTMLElement> = $('#alert');
const alert_message: JQuery<HTMLElement> = $('#alert-message');
const input_body: JQuery<HTMLElement> = $('#body');
// @ts-ignore
const timerId: number | undefined = setInterval(setNotificationDemoBody, 10000);

function setNotificationDemoBody() {
    // @ts-ignore
    if (input_body.val().search(/^It's found today at \d\d:\d\d$/i) !== -1) {
        const now = new Date();
        input_body.val(`It\'s found today at ${now.getHours()}:${addZero(now.getMinutes())}`);
    } else {
        clearInterval(timerId);
    }
}

function addZero(i: string | number) {
    return i > 9 ? i : '0' + i;
}

setNotificationDemoBody();
resetUI({
    token,
    bt_register,
    bt_delete,
    form,
    massage_row,
    info
});

if (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'localStorage' in window &&
    'fetch' in window &&
    'postMessage' in window
) {
    const messaging: firebase.messaging.Messaging = firebase.messaging();

    // already granted
    if (Notification.permission === 'granted') {
        getToken(messaging, {
            token,
            bt_register,
            bt_delete,
            form,
            massage_row,
            info
        });
    }

    // get permission on subscribe only once
    bt_register.on('click', () => {
        getToken(messaging, {
            token,
            bt_register,
            bt_delete,
            form,
            massage_row,
            info
        });
    });

    bt_delete.on('click', () => {
        // Delete Instance ID token.
        messaging
            .getToken()
            .then((currentToken: any) => {
                messaging
                    .deleteToken(currentToken)
                    .then(() => {
                        console.log('Token deleted');
                        setTokenSentToServer(null);
                        // Once token is deleted update UI.
                        resetUI({
                            token,
                            bt_register,
                            bt_delete,
                            form,
                            massage_row,
                            info
                        });
                    })
                    .catch((error) => {
                        showError('Unable to delete token', error);
                    });
            })
            .catch((error) => {
                showError('Error retrieving Instance ID token', error);
            });
    });

    form.on('submit', (event) => {
        event.preventDefault();

        const notification: any = {};
        form.find('input').each(function() {
            const input: any = $(this);

            notification[input.attr('name')] = input.val();
        });

        sendNotification({
            messaging,
            notification,
            info,
            massage_row,
            massage_id,
            showError
        });
    });

    // handle catch the notification on current page
    messaging.onMessage((payload) => {
        console.log('Message received', payload);
        info.show();
        info_message
            .text('')
            .append(`<strong>${payload.data.title}</strong>`)
            .append(`<em>${payload.data.body}</em>`);

        // register fake ServiceWorker for show notification on mobile devices
        navigator.serviceWorker.register('firebase-messaging-sw.js');
        Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                navigator.serviceWorker.ready
                    .then((registration) => {
                        // Copy data object to get parameters in the click handler
                        payload.data.data = JSON.parse(JSON.stringify(payload.data));

                        registration.showNotification(payload.data.title, payload.data);
                    })
                    .catch((error) => {
                        // registration failed :(
                        showError('ServiceWorker registration failed', {
                            error,
                            alert,
                            alert_message
                        });
                    });
            }
        });
    });

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
        messaging
            .getToken()
            .then((refreshedToken) => {
                console.log('Token refreshed');
                // Send Instance ID token to app server.
                sendTokenToServer(refreshedToken);
                updateUIForPushEnabled(refreshedToken, {
                    token,
                    bt_register,
                    bt_delete,
                    form
                });
            })
            .catch((error) => {
                showError('Unable to retrieve refreshed token', {
                    error,
                    alert,
                    alert_message
                });
            });
    });
} else {
    if (!('Notification' in window)) {
        // @ts-ignore
        showError('Notification not supported');
    } else if (!('serviceWorker' in navigator)) {
        // @ts-ignore
        showError('ServiceWorker not supported');
    } else if (!('localStorage' in window)) {
        // @ts-ignore
        showError('LocalStorage not supported');
    } else if (!('fetch' in window)) {
        // @ts-ignore
        showError('fetch not supported');
    } else if (!('postMessage' in window)) {
        // @ts-ignore
        showError('postMessage not supported');
    }

    console.warn('This browser does not support desktop notification.');
    console.log('Is HTTPS', window.location.protocol === 'https:');
    console.log('Support Notification', 'Notification' in window);
    console.log('Support ServiceWorker', 'serviceWorker' in navigator);
    console.log('Support LocalStorage', 'localStorage' in window);
    console.log('Support fetch', 'fetch' in window);
    console.log('Support postMessage', 'postMessage' in window);

    updateUIForPushPermissionRequired({
        token,
        bt_register,
        bt_delete,
        form,
        massage_row,
        info
    });
}
