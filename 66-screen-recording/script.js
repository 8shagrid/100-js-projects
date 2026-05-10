const video = document.getElementById('preview-video');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const downloadLink = document.getElementById('download-link');
const placeholder = document.getElementById('placeholder');
const timerEl = document.getElementById('timer');
const statusBar = document.getElementById('status-bar');

let mediaRecorder;
let recordedChunks = [];
let startTime;
let timerInterval;

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });

        video.srcObject = stream;
        placeholder.style.display = 'none';

        mediaRecorder = new MediaRecorder(stream);
        recordedChunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = `recording-${new Date().getTime()}.webm`;
            downloadLink.style.display = 'inline-block';
            
            // Stop all tracks
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            placeholder.style.display = 'block';
        };

        mediaRecorder.start();
        handleUIState(true);
        startTimer();

    } catch (err) {
        console.error("Error: " + err);
    }
}

function stopRecording() {
    mediaRecorder.stop();
    handleUIState(false);
    stopTimer();
}

function handleUIState(isRecording) {
    startBtn.disabled = isRecording;
    stopBtn.disabled = !isRecording;
    if (isRecording) {
        statusBar.classList.add('recording');
        downloadLink.style.display = 'none';
    } else {
        statusBar.classList.remove('recording');
    }
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
