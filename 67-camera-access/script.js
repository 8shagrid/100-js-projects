const video = document.getElementById('video-feed');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const shutterBtn = document.getElementById('shutter-btn');
const placeholder = document.getElementById('camera-placeholder');
const flash = document.getElementById('flash-overlay');
const gallery = document.getElementById('gallery');
const canvas = document.getElementById('capture-canvas');

let stream;

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: "user" 
            },
            audio: false
        });

        video.srcObject = stream;
        placeholder.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        shutterBtn.disabled = false;

    } catch (err) {
        console.error("Gagal akses kamera: ", err);
        alert("Maaf, kami tidak bisa mengakses kamera Anda. Pastikan izin telah diberikan.");
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    placeholder.style.display = 'flex';
    stopBtn.style.display = 'none';
    shutterBtn.disabled = true;
}

function takeSnapshot() {
    // Flash effect
    flash.classList.add('active');
    setTimeout(() => flash.classList.remove('active'), 300);

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    
    // Handle mirror effect in canvas capture
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/png');
    addPhotoToGallery(dataURL);
}

function addPhotoToGallery(url) {
    const photoWrap = document.createElement('div');
    photoWrap.classList.add('photo-item');
    
    const img = document.createElement('img');
    img.src = url;
    
    const overlay = document.createElement('div');
    overlay.classList.add('download-overlay');
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `photo-${new Date().getTime()}.png`;
    link.textContent = 'UNDUH';

    overlay.appendChild(link);
    photoWrap.appendChild(img);
    photoWrap.appendChild(overlay);
    
    // Prepend to show newest first
    gallery.insertBefore(photoWrap, gallery.firstChild);
}

startBtn.addEventListener('click', startCamera);
stopBtn.addEventListener('click', stopCamera);
shutterBtn.addEventListener('click', takeSnapshot);
