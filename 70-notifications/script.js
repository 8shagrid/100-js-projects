const requestBtn = document.getElementById('request-btn');
const sendBtn = document.getElementById('send-btn');
const delayBtn = document.getElementById('delay-btn');
const statusText = document.getElementById('status-text');
const statusIcon = document.getElementById('status-icon');

const titleInput = document.getElementById('notif-title');
const bodyInput = document.getElementById('notif-body');

function updateStatus() {
    const permission = Notification.permission;
    statusText.textContent = `Izin: ${permission}`;
    
    // Reset classes
    statusIcon.className = 'status-dot';
    statusIcon.classList.add(permission);

    if (permission === 'granted') {
        requestBtn.style.display = 'none';
        sendBtn.disabled = false;
        delayBtn.disabled = false;
    } else if (permission === 'denied') {
        requestBtn.textContent = 'Izin Ditolak';
        requestBtn.disabled = true;
        sendBtn.disabled = true;
        delayBtn.disabled = true;
    } else {
        requestBtn.style.display = 'block';
        sendBtn.disabled = true;
        delayBtn.disabled = true;
    }
}

async function requestPermission() {
    const result = await Notification.requestPermission();
    console.log('Permission Result:', result);
    updateStatus();
}

function sendNotification() {
    const title = titleInput.value || 'Pemberitahuan';
    const options = {
        body: bodyInput.value || 'Ini adalah isi notifikasi.',
        icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png'
    };

    const n = new Notification(title, options);

    n.onclick = () => {
        window.focus();
        n.close();
    };
}

// Event Listeners
requestBtn.addEventListener('click', requestPermission);

sendBtn.addEventListener('click', sendNotification);

delayBtn.addEventListener('click', () => {
    delayBtn.textContent = 'Menunggu...';
    delayBtn.disabled = true;
    
    setTimeout(() => {
        sendNotification();
        delayBtn.textContent = 'Tunda 5 Detik';
        delayBtn.disabled = false;
    }, 5000);
});

// Initial Status Check
if (!('Notification' in window)) {
    statusText.textContent = 'Tidak Didukung';
    requestBtn.disabled = true;
} else {
    updateStatus();
}
