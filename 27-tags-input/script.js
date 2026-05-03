const tagInput = document.getElementById('tag-input');
const tagsList = document.getElementById('tags-list');
const remainingCount = document.getElementById('remaining');
const removeAllBtn = document.getElementById('remove-all');

let tags = [];
const maxTags = 10;

function createTag(tagValue) {
    const li = document.createElement('li');
    li.classList.add('tag');
    li.innerHTML = `
        <span>${tagValue}</span>
        <span class="close-btn">&times;</span>
    `;
    
    li.querySelector('.close-btn').addEventListener('click', () => {
        removeTag(tagValue);
    });
    
    return li;
}

function removeTag(tagValue) {
    tags = tags.filter(t => t !== tagValue);
    renderTags();
}

function renderTags() {
    tagsList.innerHTML = '';
    tags.forEach(tag => {
        tagsList.appendChild(createTag(tag));
    });
    
    remainingCount.textContent = maxTags - tags.length;
}

tagInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const tagValue = tagInput.value.trim();
        
        if (tagValue && !tags.includes(tagValue) && tags.length < maxTags) {
            tags.push(tagValue);
            renderTags();
            tagInput.value = '';
        }
    }
});

removeAllBtn.addEventListener('click', () => {
    tags = [];
    renderTags();
});

// Initial render
renderTags();
