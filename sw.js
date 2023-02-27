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
