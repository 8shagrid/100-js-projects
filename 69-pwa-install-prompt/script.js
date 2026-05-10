const installCard = document.getElementById('install-card');
const installBtn = document.getElementById('install-btn');
const dismissBtn = document.getElementById('dismiss-btn');

let deferredPrompt;

// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Registration failed:', err));
    });
}

// 2. Capture 'beforeinstallprompt' Event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the custom install UI
    installCard.style.display = 'block';
    console.log("'beforeinstallprompt' event was fired.");
});

// 3. Handle Install Button Click
installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;

    // Hide our custom install UI
    installCard.style.display = 'none';
});

// 4. Handle Dismiss Button Click
dismissBtn.addEventListener('click', () => {
    installCard.style.display = 'none';
});

// 5. Detect if App is Installed
window.addEventListener('appinstalled', (evt) => {
    console.log('App was successfully installed!');
    installCard.style.display = 'none';
    alert('Terima kasih! Aplikasi berhasil diinstal.');
});
