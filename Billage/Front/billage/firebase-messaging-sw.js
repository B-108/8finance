self.addEventListener("install", function (e) {
    console.log("fcm sw install..", e);
    self.skipWaiting();
  });
  
  self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..", e);
  });

//push 알람 받음
  self.addEventListener("push", function (e) {
    if (!e.data.json()) return;
  
    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
    //   icon: resultData.image, // 웹 푸시 이미지는 icon
    //   tag: resultData.tag,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });


//받은 push 알람 닫을 때 이벤트 만들기
  self.addEventListener("notificationclick", function (event) {
    console.log("notification click");
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });