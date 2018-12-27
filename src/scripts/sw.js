importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '607900386765'
});

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Handling background message', payload);

    // Copy data object to get parameters in the click handler
    payload.data.data = JSON.parse(JSON.stringify(payload.data));

    return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});


workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
    // 'http://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
    new RegExp('(https):.*min\.(css|js)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cdn-cache'
    })
)

workbox.routing.registerRoute(
    new RegExp('(https):\\/\\/maxcdn.bootstrapcdn.com\\/font-awesome\\/4.7.0\\/.*'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'font-awesome-cache'
    })
);

workbox.routing.registerRoute(
    new RegExp('(https|http):\\/\\/rest.messagebird.com\\/(balance|messages)'),
    workbox.strategies.networkFirst({
        cacheName: 'api-data'
    })
);

self.addEventListener('fetch', event => {
    if(event.request.method === "POST") {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response(
                    JSON.stringify({ error: "This action disabled while app is offline!" }), {
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
            })
        )
    }
})

// self.addEventListener('push', event => {
//     event.waitUntil(self.registration.showNotification('Did you make a $1,000,000 purchase at Dr. Evil...', {
//         body: "Did you make a $1,000,000 purchase at Dr. Evil...",
//         icon: "images/ccard.png",
//         vibrate: [200, 100, 200, 100, 200, 100, 400],
//         tag: "request",
//         actions: [
//             { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
//             { "action": "no", "title": "No", "icon": "images/no.png" }
//         ]
//     }))
// })

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent);
