const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const prompt = document.getElementById('prompt');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-btn');
const submitBtn = document.getElementById('submit-btn');

// Open file selector when clicking upload area
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        showPreview(file);
    }
});

// Drag & Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('active');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('active');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        showPreview(file);
    }
});

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        prompt.style.display = 'none';
        previewContainer.style.display = 'block';
        submitBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

// Remove button
removeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent opening file selector
    imagePreview.src = '';
    fileInput.value = '';
    prompt.style.display = 'flex';
    previewContainer.style.display = 'none';
    submitBtn.disabled = true;
});

submitBtn.addEventListener('click', () => {
    alert('Foto berhasil "dikirim"! (Hanya simulasi)');
});
