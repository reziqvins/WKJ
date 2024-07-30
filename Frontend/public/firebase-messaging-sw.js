importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDH1xWLVwRFirhLp8ltMm3LcueklYZ-1hA",
    authDomain: "cobatoko-57725.firebaseapp.com",
    projectId: "cobatoko-57725",
    storageBucket: "cobatoko-57725.appspot.com",
    messagingSenderId: "410394776123",
    appId: "1:410394776123:web:c746b417cf627ca439821e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
