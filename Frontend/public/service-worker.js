self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push received: ", data);

  const options = {
    body: data.body,
    icon: "https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png",  // Absolute path
    badge: "/badge.png", // Absolute path
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
