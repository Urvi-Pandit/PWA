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
    const options = {
        body: 'Hi! This is Urvi!',
        icon: '',
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore', title: 'Explore this new world',
                icon: ''
            },
            {
                action: 'close', title: 'Close',
                icon: ''
            },
        ]
    };
    event.waitUntil(
        self.registration.showNotification('Title', options)
    )
    });