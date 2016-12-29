var socket = new WebSocket('wss://reforce-pgxp.rhcloud.com:8443/echo');

socket.onopen = function (evt) {
    console.log("Socket opened");
};
socket.onclose = function (evt) {
    console.log("Socket closed");
};

socket.onmessage = function (evt) {

    if (evt.data.event === "mensagem" || evt.data.event === "comunicado") {
        var notificationOptions = {
            body: evt.data,
            icon: './images/demoiselle.png',
            tag: 'simple-push-demo-notification',
            vibrate: [100, 100, 100, 100, 100]
        };

        self.registration.showNotification('Sócrates App', notificationOptions);
        console.log(evt.data);
    }

    
};

socket.onerror = function (evt) {
    console.log("Error: " + evt.data);
};

// Install Service Worker
self.addEventListener('install', function (event) {
    console.log('installed!');
});

// Service Worker Active
self.addEventListener('activate', function (event) {
    console.log('activated!');
});

self.addEventListener('push', function (event) {
    var notificationOptions = {
        body: event.data,
        icon: './images/demoiselle.png',
        tag: 'simple-push-demo-notification',
        vibrate: [100, 100, 100, 100, 100]
    };

    event.waitUntil(self.registration.showNotification('Sócrates', notificationOptions));
});

self.addEventListener('message', function (event) {
   var notificationOptions = {
        body: event.data,
        icon: './images/demoiselle.png',
        tag: 'simple-push-demo-notification',
        vibrate: [100, 100, 100, 100, 100]
    };

    event.waitUntil(self.registration.showNotification('Sócrates', notificationOptions));
});

self.addEventListener('notificationclick', function (event) {

    event.waitUntil(
            clients.matchAll({
                type: "window"
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
            );

});

//function send_message_to_all_clients(msg) {
//    clients.matchAll().then(clients => {
//        clients.forEach(client => {
//            send_message_to_client(client, msg).then(m => console.log("SW Received Message: " + m));
//        });
//    });
//}
//
//function send_message_to_client(client, msg) {
//    return new Promise(function (resolve, reject) {
//        var msg_chan = new MessageChannel();
//
//        msg_chan.port1.onmessage = function (event) {
//            if (event.data.error) {
//                reject(event.data.error);
//            } else {
//                resolve(event.data);
//            }
//        };
//
//        client.postMessage("SW Says: '" + msg + "'", [msg_chan.port2]);
//    });
//}