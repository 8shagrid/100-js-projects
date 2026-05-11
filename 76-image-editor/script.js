const fileInput = document.querySelector("#file-input"),
    chooseImgBtn = document.querySelector("#choose-img-btn"),
    previewImg = document.querySelector("#preview-img"),
    uploadPrompt = document.querySelector("#upload-prompt"),
    filterOptions = document.querySelectorAll(".filter-options .filter-item"),
    filterSlider = document.querySelector("#filter-slider"),
    rotateBtns = document.querySelectorAll(".transform-btns button"),
    resetBtn = document.querySelector("#reset-btn"),
    saveBtn = document.querySelector("#save-btn");

let brightness = 100, saturation = 100, contrast = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = (e) => {
    let file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetBtn.click(); // Reset controls for new image
        document.querySelector(".app-container").classList.add("has-image");
        previewImg.classList.remove("placeholder-img");
        uploadPrompt.style.display = "none";
    });
};

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter-options .active").classList.remove("active");
        option.classList.add("active");
        
        const filter = option.getAttribute("data-filter");
        if (filter === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
        } else if (filter === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
        } else if (filter === "contrast") {
            filterSlider.max = "200";
            filterSlider.value = contrast;
        } else if (filter === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
        }
        option.querySelector(".value").innerText = `${filterSlider.value}%`;
    });
});

const updateFilterValue = () => {
    const selectedFilter = document.querySelector(".filter-options .active");
    const filter = selectedFilter.getAttribute("data-filter");
    selectedFilter.querySelector(".value").innerText = `${filterSlider.value}%`;

    if (filter === "brightness") {
        brightness = filterSlider.value;
    } else if (filter === "saturation") {
        saturation = filterSlider.value;
    } else if (filter === "contrast") {
        contrast = filterSlider.value;
    } else if (filter === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilters();
};

rotateBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "rotate-left") {
            rotate -= 90;
        } else if (btn.id === "rotate-right") {
            rotate += 90;
        } else if (btn.id === "flip-horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});

const resetFilters = () => {
    brightness = 100; saturation = 100; contrast = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // Select brightness by default
    applyFilters();
};

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions to image natural dimensions
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    // Apply filters to canvas context
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    
    // Handle transformations
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    
    // Draw image centered
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    // Download logic
    const link = document.createElement("a");
    link.download = "lumina-edit-image.jpg";
    link.href = canvas.toDataURL();
    link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilterValue);
resetBtn.addEventListener("click", resetFilters);
saveBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
