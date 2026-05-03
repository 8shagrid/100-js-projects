const searchForm = document.getElementById('search-form');
const usernameInput = document.getElementById('username-input');
const userCard = document.getElementById('user-card');

const API_URL = 'https://api.github.com/users/';

async function getUser(username) {
    try {
        const response = await fetch(API_URL + username);
        if (!response.ok) throw new Error('User tidak ditemukan');

        const data = await response.json();
        createUserCard(data);
        getRepos(username);
    } catch (error) {
        createErrorCard('Pengguna tidak ditemukan. Silakan cek kembali username tersebut.');
    }
}

async function getRepos(username) {
    try {
        const response = await fetch(API_URL + username + '/repos?sort=created');
        const data = await response.json();
        addReposToCard(data.slice(0, 5));
    } catch (error) {
        console.error('Gagal mengambil repo');
    }
}

function createUserCard(user) {
    const cardHTML = `
        <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
        <div class="user-info">
            <h2>${user.name || user.login}</h2>
            <p>${user.bio || 'Tidak ada biodata.'}</p>
            <div class="stats">
                <div class="item"><span>${user.followers}</span> Followers</div>
                <div class="item"><span>${user.following}</span> Following</div>
                <div class="item"><span>${user.public_repos}</span> Repos</div>
            </div>
            <div id="repos" class="repos"></div>
        </div>
    `;
    userCard.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposElement = document.getElementById('repos');
    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo-tag');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposElement.appendChild(repoEl);
    });
}

function createErrorCard(msg) {
    userCard.innerHTML = `
        <div class="error-card">
            <h2>Oops!</h2>
            <p>${msg}</p>
        </div>
    `;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = usernameInput.value.trim();
    if (user) {
        getUser(user);
        usernameInput.value = '';
    }
});

// Initial load for demo
getUser('octocat');
