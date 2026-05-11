const toolBtns = document.querySelectorAll(".tool-btn");
const fontSizeSelect = document.querySelector("#font-size");
const textColorInput = document.querySelector("#text-color");
const downloadBtn = document.querySelector("#download-btn");
const canvas = document.querySelector("#document-canvas");

// Formatting logic
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const command = btn.getAttribute("data-command");
        document.execCommand(command, false, null);
        btn.classList.toggle("active");
    });
});

fontSizeSelect.addEventListener("change", (e) => {
    document.execCommand("fontSize", false, e.target.value);
});

textColorInput.addEventListener("input", (e) => {
    document.execCommand("foreColor", false, e.target.value);
});

// PDF Generation
downloadBtn.addEventListener("click", () => {
    const element = canvas;
    const opt = {
        margin:       1,
        filename:     'DocuCraft-Document.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
});

// Selection change feedback
document.addEventListener("selectionchange", () => {
    // This could be used to update the "active" state of tool buttons based on current selection
    // For simplicity, we'll skip complex selection state management
});

// Initial focus
window.addEventListener("load", () => {
    canvas.focus();
});
