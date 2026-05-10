document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const endpointInput = document.getElementById('endpointUrl');
    const queryEditor = document.getElementById('queryEditor');
    const runBtn = document.getElementById('runBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const responseBody = document.getElementById('responseBody');
    const statusIndicator = document.getElementById('statusIndicator');
    const loader = document.getElementById('loader');
    const templateList = document.getElementById('templateList');

    // Load saved data from localStorage
    const savedEndpoint = localStorage.getItem('gql_endpoint');
    const savedQuery = localStorage.getItem('gql_query');

    if (savedEndpoint) endpointInput.value = savedEndpoint;
    if (savedQuery) queryEditor.value = savedQuery;

    // Run Query Logic
    async function runQuery() {
        const url = endpointInput.value.trim();
        const query = queryEditor.value.trim();

        if (!url) {
            updateStatus('Error', 'error');
            setResponse({ error: 'Endpoint URL is required' });
            return;
        }

        if (!query) {
            updateStatus('Error', 'error');
            setResponse({ error: 'GraphQL Query is required' });
            return;
        }

        // Show loading state
        showLoader(true);
        updateStatus('Loading...', 'loading');
        runBtn.disabled = true;

        // Save to localStorage
        localStorage.setItem('gql_endpoint', url);
        localStorage.setItem('gql_query', query);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();

            if (response.ok) {
                updateStatus('Success', 'success');
            } else {
                updateStatus(`Error ${response.status}`, 'error');
            }

            setResponse(result);
        } catch (error) {
            console.error('Fetch Error:', error);
            updateStatus('Network Error', 'error');
            setResponse({ 
                error: 'Failed to fetch. This could be due to CORS or an invalid URL.',
                details: error.message 
            });
        } finally {
            showLoader(false);
            runBtn.disabled = false;
        }
    }

    // Helper: Set Response and Highlight
    function setResponse(data) {
        const formatted = JSON.stringify(data, null, 2);
        responseBody.textContent = formatted;
        
        // Re-run Prism highlighting
        if (window.Prism) {
            Prism.highlightElement(responseBody);
        }
    }

    // Helper: Update Status UI
    function updateStatus(text, type) {
        statusIndicator.textContent = text;
        statusIndicator.className = `status-badge ${type}`;
    }

    // Helper: Show/Hide Loader
    function showLoader(show) {
        if (show) {
            loader.classList.remove('hidden');
        } else {
            loader.classList.add('hidden');
        }
    }

    // Event Listeners
    runBtn.addEventListener('click', runQuery);

    clearBtn.addEventListener('click', () => {
        queryEditor.value = '';
        queryEditor.focus();
    });

    copyBtn.addEventListener('click', () => {
        const text = responseBody.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            `;
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    // Template selection
    templateList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        // Remove active class from all
        document.querySelectorAll('.template-list li').forEach(el => el.classList.remove('active'));
        li.classList.add('active');

        const endpoint = li.dataset.endpoint;
        const query = li.dataset.query;

        endpointInput.value = endpoint;
        queryEditor.value = query;

        // Visual feedback
        queryEditor.classList.add('flash');
        setTimeout(() => queryEditor.classList.remove('flash'), 500);
    });

    // Keyboard Shortcut (Ctrl+Enter to run)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            runQuery();
        }
    });

    // Initial highlight if there's saved content
    if (responseBody.textContent !== '{}') {
        setResponse(JSON.parse(responseBody.textContent));
    }
});
