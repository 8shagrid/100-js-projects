const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

const initialText = `# Markdown Live Previewer 🚀

Halo! Ini adalah editor markdown real-time. Kamu bisa mencoba beberapa elemen di bawah ini:

## List:
- Item Pertama
- Item Kedua
- Item Ketiga

## Code Blocks:
\`\`\`javascript
function helloWorld() {
  console.log("Halo Dunia!");
}
helloWorld();
\`\`\`

## Blockquotes:
> "Satu-satunya batasan adalah imajinasi kamu."

Silakan hapus teks ini dan mulai menulis!
`;

// Configure marked options
marked.setOptions({
    breaks: true,
    gfm: true
});

function updatePreview() {
    const markdownText = editor.value;
    preview.innerHTML = marked.parse(markdownText);
}

// Initial update
editor.value = initialText;
updatePreview();

// Event Listeners
editor.addEventListener('input', updatePreview);

clearBtn.addEventListener('click', () => {
    if (confirm('Kamu yakin ingin menghapus semua teks?')) {
        editor.value = '';
        updatePreview();
    }
});

copyBtn.addEventListener('click', () => {
    const htmlContent = preview.innerHTML;
    navigator.clipboard.writeText(htmlContent).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Berhasil!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
});
