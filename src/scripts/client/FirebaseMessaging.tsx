import * as firebase from 'firebase/app';
import * as React from 'react';

export interface FirebaseState {
    [key: string]: any;
}

export interface FirebaseProps {
    [key: string]: any;
}

export default class FirebaseMessaging<
    Props extends FirebaseProps,
    State extends FirebaseState
> extends React.PureComponent<Props, State> {
    private key: string =
        'AAAAjYmvxc0:APA91bGL0G4icF0xld2ENcDl0KUVvc1Iac2P3uj-luZuEvIeBrIgaMTShKDKNFsIdTtsn06iMAPJwnbzdD4BNhtDbF18iEhHiZES93uAVOk5_8F0YnxPcxvZkBPUS1I_IGa-yjwb1SsS';
    messaging: firebase.messaging.Messaging | undefined = undefined;
    tokenValue: string = '';
    isRegistered: boolean = false;

    private updateUIForPushPermissionRequired() {
        // bt_register.attr('disabled', 'disabled');
        this.resetUI();
    }

    private updateUIForPushEnabled(currentToken: string) {
        console.log(currentToken);
        // token.text(currentToken);
        // bt_register.hide();
        // bt_delete.show();
        // form.show();
    }

    private showError(title: string, error?: any) {
        if (error !== 'undefined') {
            console.error(title, error);
        } else {
            console.error(title);
        }
    }

    private isTokenSentToServer(currentToken: string): boolean {
        return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken;
    }

    private setTokenSentToServer(currentToken: string) {
        if (currentToken) {
            window.localStorage.setItem('sentFirebaseMessagingToken', currentToken);
        } else {
            window.localStorage.removeItem('sentFirebaseMessagingToken');
        }
    }

    private sendTokenToServer(token: string) {
        if (!this.isTokenSentToServer(token)) {
            console.log('Sending token to server...');
            // send current token to server
            // $.post(url, {token: currentToken});
            this.setTokenSentToServer(token);
        } else {
            console.log("Token already sent to server so won't send it again unless it changes");
        }
    }

    async getToken() {
        if (!this.messaging) {
            return;
        }

        try {
            await this.messaging.requestPermission();

            try {
                const currentToken: any = await this.messaging.getToken();

                if (currentToken) {
                    this.sendTokenToServer(currentToken);
                    this.updateUIForPushEnabled(currentToken);
                } else {
                    this.showError('No Instance ID token available. Request permission to generate one', {});
                    this.updateUIForPushPermissionRequired();
                    this.setTokenSentToServer('');
                }
            } catch (error) {
                this.showError('An error occurred while retrieving token', error);
                this.updateUIForPushPermissionRequired();
                this.setTokenSentToServer('');
            }
        } catch (error) {
            this.showError('Unable to get permission to notify', error);
        }
    }

    async sendNotification(notification: any = {}) {
        console.log('Send notification', notification);

        // // hide last notification data
        // if (info && massage_row) {
        //     info.hide();
        //     massage_row.hide();
        // }

        if (!this.messaging) {
            return;
        }

        try {
            const currentToken: any = await this.messaging.getToken();

            console.log('currentToken', currentToken);

            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    Authorization: 'key=' + this.key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Firebase loses 'image' from the notification.
                    // And you must see this: https://github.com/firebase/quickstart-js/issues/71
                    data: notification,
                    to: currentToken
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    console.log('Response', json);
                    // if (massage_row && massage_id) {
                    //     if (json.success === 1) {
                    //         massage_row.show();
                    //         massage_id.text(json.results[0].message_id);
                    //     } else {
                    //         massage_row.hide();
                    //         massage_id.text(json.results[0].error);
                    //     }
                    // }
                })
                .catch((error) => {
                    this.showError('', error);
                });
        } catch (error) {
            this.showError('Error retrieving Instance ID token', error);
        }
    }

    async onRequestPermission() {
        console.log(456);
        if (!this.messaging) {
            return;
        }

        try {
            await this.messaging.requestPermission();
            this.initFirebase();
        } catch (e) {
            this.showError(e.message);
        }
    }

    resetUI(): void {
        this.tokenValue = '';
        this.isRegistered = false;

        console.log('resetUI');
    }

    initializeFirebaseApp(messagingSenderId: string) {
        firebase.initializeApp({
            messagingSenderId
        });
    }

    initMessaging() {
        if (
            'Notification' in window &&
            'serviceWorker' in navigator &&
            'localStorage' in window &&
            'fetch' in window &&
            'postMessage' in window
        ) {
            this.messaging = firebase.messaging();
            navigator.serviceWorker.register('firebase-messaging-sw.js');
        }
    }

    // onRegistration(): void {
    //     this.getToken();
    // }

    async onDelete() {
        if (!this.messaging) {
            return;
        }

        try {
            const currentToken: string = (await this.messaging.getToken()) || '';
            this.messaging
                .deleteToken(currentToken)
                .then(() => {
                    console.log('Token deleted');
                    this.setTokenSentToServer('');
                    // Once token is deleted update UI.
                    this.resetUI();
                })
                .catch((error) => {
                    this.showError('Unable to delete token', error);
                });
        } catch (error) {
            this.showError('Error retrieving Instance ID token', error);
        }
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const notification: any = {};

        this.sendNotification(notification);
    }

    initFirebase(): void {
        // already granted
        if (Notification.permission === 'granted') {
            this.getToken();
        }

        if (!this.messaging) {
            return;
        }

        // handle catch the notification on current page
        this.messaging.onMessage((payload) => {
            console.log('Message received', payload);

            // register fake ServiceWorker for show notification on mobile devices
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
                            this.showError('ServiceWorker registration failed', error);
                        });
                }
            });
        });

        // Callback fired if Instance ID token is updated.
        this.messaging.onTokenRefresh(async () => {
            try {
                if (!this.messaging) {
                    throw Error('Messaging is not initialized');
                }
                const refreshedToken = (await this.messaging.getToken()) || '';

                console.log('Token refreshed');
                // Send Instance ID token to app server.
                this.sendTokenToServer(refreshedToken);
                this.updateUIForPushEnabled(refreshedToken);
            } catch (error) {
                this.showError('Unable to retrieve refreshed token', {error});
            }
        });
        if (!('Notification' in window)) {
            this.showError('Notification not supported');
        } else if (!('serviceWorker' in navigator)) {
            this.showError('ServiceWorker not supported');
        } else if (!('localStorage' in window)) {
            this.showError('LocalStorage not supported');
        } else if (!('fetch' in window)) {
            this.showError('fetch not supported');
        } else if (!('postMessage' in window)) {
            this.showError('postMessage not supported');
        }

        console.warn('This browser does not support desktop notification.');
        console.log('Is HTTPS', window.location.protocol === 'https:');
        console.log('Support Notification', 'Notification' in window);
        console.log('Support ServiceWorker', 'serviceWorker' in navigator);
        console.log('Support LocalStorage', 'localStorage' in window);
        console.log('Support fetch', 'fetch' in window);
        console.log('Support postMessage', 'postMessage' in window);

        this.updateUIForPushPermissionRequired();
    }
}
