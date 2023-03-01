self.addEventListener('install', evt => {
    console.log('service worker has been installed');
});

self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
});

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
});

self.addEventListener('sync', evt => {
    console.log('sync event', evt);
});

self.addEventListener('sync', (event) => {
    if (event.tag == 'event1') {
      event.waitUntil('event1')
    }
  });

self.addEventListener('push', (event) => {
    console.log('Received a push event', event)
  
    const options = {
      title: 'I got a message for you!',
      body: 'Here is the body of the message',
      icon: '/Urvi.jpg',
      tag: 'tag-for-this-notification',
    }
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    )
});
self.addEventListener("push", function (event) {
  if (event && event.data) {
    var data = event.data.json();
    if (data.method == "pushMessage") {
      console.log("Push notification sent");
      event.waitUntil(
        self.registration.showNotification("Urvi Resume", {
          body: data.message,
          icon: "/cropped.png",
        })
      );
    }
  }
});

var filesToCache = ["/profile/index.html"];

var preLoad = function () {
  return caches.open("offline").then(function (cache) {
    // caching index and important routes
    return cache.addAll(filesToCache);
  });
};

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function (request) {
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function (request) {
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status == 404) {
        return cache.match("offline.html");
      } else {
        return matching;
      }
    });
  });
};
