self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push received: ", data);

  const options = {
    body: data.body,
    icon: "/logo.png",  // Absolute path
    badge: "/badge.png", // Absolute path
    data: {
      url: "http://localhost:5174/Konsultasi"  // Add URL to notification data
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)  // Use the URL from notification data
  );
});
