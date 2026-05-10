document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    const toolbar = document.querySelector('.toolbar');
    const brushTool = document.getElementById('brushTool');
    const eraserTool = document.getElementById('eraserTool');
    const colorPicker = document.getElementById('colorPicker');
    const colorPreview = document.getElementById('colorPreview');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeLabel = document.getElementById('sizeLabel');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const undoBtn = document.getElementById('undoBtn');
    const brushCursor = document.getElementById('brushCursor');

    // App State
    let isDrawing = false;
    let currentTool = 'brush'; // 'brush' or 'eraser'
    let brushColor = colorPicker.value;
    let brushSize = sizeSlider.value;
    let history = [];
    const MAX_HISTORY = 20;

    // Initialize Canvas
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Fill background with white initially
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        saveState(); // Save initial blank state
    }

    // Helper: Get Mouse Position relative to canvas
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    // Drawing Logic
    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        draw(e); 
    }

    function draw(e) {
        if (!isDrawing) return;

        const pos = getMousePos(e);
        
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.strokeStyle = currentTool === 'brush' ? brushColor : '#ffffff';
        ctx.globalCompositeOperation = 'source-over';

        // Use a continuous path for smoother lines
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        // Start a new path from this point to prevent building one massive path object
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            saveState();
        }
    }

    // History Management
    function saveState() {
        if (history.length >= MAX_HISTORY) {
            history.shift();
        }
        history.push(canvas.toDataURL());
    }

    function undo() {
        if (history.length > 1) {
            history.pop(); // Remove current state
            const prevState = history[history.length - 1];
            const img = new Image();
            img.src = prevState;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        }
    }

    // Tool Management
    function setTool(tool) {
        currentTool = tool;
        brushTool.classList.toggle('active', tool === 'brush');
        eraserTool.classList.toggle('active', tool === 'eraser');
    }

    // Event Listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Global Mouse Move for Cursor
    window.addEventListener('mousemove', (e) => {
        updateCursor(e);
    });

    // Toolbar Events
    brushTool.addEventListener('click', () => setTool('brush'));
    eraserTool.addEventListener('click', () => setTool('eraser'));

    colorPicker.addEventListener('input', (e) => {
        brushColor = e.target.value;
        colorPreview.style.backgroundColor = brushColor;
        brushCursor.style.backgroundColor = `${brushColor}4d`; // Add 30% alpha (4d in hex)
        setTool('brush');
    });

    sizeSlider.addEventListener('input', (e) => {
        brushSize = e.target.value;
        sizeLabel.textContent = `${brushSize}px`;
        updateCursorSize();
    });

    clearBtn.addEventListener('click', () => {
        if (confirm('Clear entire canvas?')) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            saveState();
        }
    });

    saveBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `drawing-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });

    undoBtn.addEventListener('click', undo);

    // Custom Cursor Logic
    function updateCursor(e) {
        brushCursor.style.left = `${e.clientX}px`;
        brushCursor.style.top = `${e.clientY}px`;
        
        // Hide cursor when over toolbar or outside window
        const overToolbar = e.target.closest('.toolbar');
        brushCursor.style.opacity = overToolbar ? '0' : '1';
    }

    function updateCursorSize() {
        brushCursor.style.width = `${brushSize}px`;
        brushCursor.style.height = `${brushSize}px`;
    }

    // Handle Window Resize
    window.addEventListener('resize', () => {
        const tempImage = canvas.toDataURL();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const img = new Image();
        img.src = tempImage;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
        canvas.dispatchEvent(new MouseEvent('mouseup'));
    });

    // Initial setup
    initCanvas();
    updateCursorSize();
    brushCursor.style.backgroundColor = `${brushColor}4d`;
});
