const codeInput = document.getElementById('code-input');
const codeOutput = document.getElementById('code-output');
const langSelect = document.getElementById('language-select');
const copyBtn = document.getElementById('copy-btn');

const sampleCode = {
    javascript: `// Contoh JavaScript
function sayHello(name) {
  console.log(\`Halo, \${name}!\`);
}

sayHello('Dunia');`,
    html: `<!-- Contoh HTML -->
<div class="container">
  <h1>Halo Dunia</h1>
  <p>Selamat datang di Code Highlighter.</p>
</div>`,
    css: `/* Contoh CSS */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #38bdf8;
}`,
    python: `# Contoh Python
def sapa(nama):
    print(f"Halo, {nama}!")

sapa("Dunia")`,
    json: `{
  "nama": "Project 72",
  "tipe": "Syntax Highlighter",
  "status": "Selesai"
}`
};

function highlight() {
    const code = codeInput.value;
    const lang = langSelect.value;
    
    // Update class and content
    codeOutput.className = `language-${lang}`;
    codeOutput.textContent = code;
    
    // Trigger Prism
    Prism.highlightElement(codeOutput);
}

// Initial highlight
codeInput.value = sampleCode.javascript;
highlight();

// Event Listeners
codeInput.addEventListener('input', highlight);
langSelect.addEventListener('change', highlight);

copyBtn.addEventListener('click', () => {
    const code = codeInput.value;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Berhasil!';
        copyBtn.style.borderColor = '#10b981';
        copyBtn.style.color = '#10b981';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
        }, 2000);
    });
});
