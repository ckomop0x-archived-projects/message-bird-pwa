import * as firebase from 'firebase';

export interface SendNotificationOptions {
    messaging: firebase.messaging.Messaging;
    notification: HTMLElement;
    info?: any;
    massage_row?: any;
    massage_id?: any;
    showError?: any;
}

export default function sendNotification(sendNotificationOptions: SendNotificationOptions) {
    const key = 'server_API';
    const {notification, messaging, info, massage_row, massage_id, showError} = sendNotificationOptions;

    console.log('Send notification', notification);

    // hide last notification data
    info.hide();
    massage_row.hide();

    messaging
        .getToken()
        // @ts-ignore
        .then((currentToken) => {
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    Authorization: 'key=' + key,
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

                    if (json.success === 1) {
                        massage_row.show();
                        massage_id.text(json.results[0].message_id);
                    } else {
                        massage_row.hide();
                        massage_id.text(json.results[0].error);
                    }
                })
                .catch((error) => {
                    // @ts-ignore
                    showError(error);
                });
        })
        // @ts-ignore
        .catch((error) => {
            showError('Error retrieving Instance ID token', error);
        });
}
