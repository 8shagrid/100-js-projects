const searchForm = document.getElementById('search-form');
const wordInput = document.getElementById('word-input');
const resultCard = document.getElementById('result-card');

async function lookupWord(word) {
    resultCard.innerHTML = '<div class="initial-msg">Mencari definisi...</div>';

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Kata tidak ditemukan');

        const data = await response.json();
        renderResult(data[0]);
    } catch (error) {
        resultCard.innerHTML = `
            <div class="error-msg">
                <h2>Oops!</h2>
                <p>Kata <strong>"${word}"</strong> tidak ditemukan dalam kamus kami.</p>
            </div>
        `;
    }
}

function renderResult(data) {
    let meaningsHTML = '';

    data.meanings.forEach(meaning => {
        let definitionsHTML = '';
        meaning.definitions.slice(0, 3).forEach(def => {
            definitionsHTML += `
                <li class="definition-item">
                    <p>${def.definition}</p>
                    ${def.example ? `<span class="example">"${def.example}"</span>` : ''}
                </li>
            `;
        });

        meaningsHTML += `
            <div class="meaning-section">
                <div class="part-of-speech">${meaning.partOfSpeech}</div>
                <ul class="definitions-list">
                    ${definitionsHTML}
                </ul>
            </div>
        `;
    });

    resultCard.innerHTML = `
        <div class="word-header">
            <h2>${data.word}</h2>
            <span class="phonetic">${data.phonetic || ''}</span>
        </div>
        ${meaningsHTML}
    `;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const word = wordInput.value.trim();
    if (word) {
        lookupWord(word);
    }
});
