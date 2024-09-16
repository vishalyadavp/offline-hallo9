// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/scripts/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered: ', registration);
        }).catch(registrationError => {
          console.log('ServiceWorker registration failed: ', registrationError);
        });
    });
  }
  
  // Push Notifications (request permission)
  if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: '<Your Public Key>'
          }).then(subscription => {
            console.log('User is subscribed: ', subscription);
          });
        });
      }
    });
  }
  
  // Install Prompt Logic
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';
  
    installButton.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  });
  