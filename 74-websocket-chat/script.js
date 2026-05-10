document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const wsUrlInput = document.getElementById('wsUrl');
    const usernameInput = document.getElementById('username');
    const connectBtn = document.getElementById('connectBtn');
    const statusCircle = document.getElementById('statusCircle');
    const statusText = document.getElementById('statusText');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChatBtn = document.getElementById('clearChat');

    let socket = null;

    // Connect / Disconnect Logic
    function toggleConnection() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        } else {
            connect();
        }
    }

    function connect() {
        const url = wsUrlInput.value.trim();
        if (!url) return;

        updateStatus('Connecting...', 'connecting');
        connectBtn.disabled = true;

        try {
            socket = new WebSocket(url);

            socket.onopen = () => {
                updateStatus('Connected', 'connected');
                connectBtn.textContent = 'Disconnect';
                connectBtn.classList.add('disconnect');
                connectBtn.disabled = false;
                
                enableChat(true);
                addSystemMessage(`Connected to ${url}`);
            };

            socket.onmessage = (event) => {
                let data = event.data;
                // Postman echo returns what we send. Let's try to parse if it's JSON
                try {
                    const parsed = JSON.parse(data);
                    renderMessage(parsed.text || data, parsed.user || 'Echo Server', 'other');
                } catch (e) {
                    renderMessage(data, 'Echo Server', 'other');
                }
            };

            socket.onclose = (event) => {
                updateStatus('Disconnected', 'disconnected');
                connectBtn.textContent = 'Connect';
                connectBtn.classList.remove('disconnect');
                connectBtn.disabled = false;

                enableChat(false);
                addSystemMessage('Disconnected from server.');
                socket = null;
            };

            socket.onerror = (error) => {
                console.error('WebSocket Error:', error);
                updateStatus('Error', 'disconnected');
                addSystemMessage('Connection error occurred.');
            };

        } catch (error) {
            console.error('Connection Error:', error);
            updateStatus('Invalid URL', 'disconnected');
            connectBtn.disabled = false;
        }
    }

    // Chat Logic
    function sendMessage(e) {
        e.preventDefault();
        const text = messageInput.value.trim();
        const user = usernameInput.value.trim() || 'Guest';

        if (!text || !socket || socket.readyState !== WebSocket.OPEN) return;

        const messageData = {
            user: user,
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Send as string
        socket.send(JSON.stringify(messageData));

        // Render locally (self)
        renderMessage(text, user, 'self');
        
        messageInput.value = '';
        messageInput.focus();
    }

    function renderMessage(text, user, type) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        
        messageEl.innerHTML = `
            <div class="message-meta">
                <span class="username">${user}</span>
                <span class="time">${time}</span>
            </div>
            <div class="message-bubble">
                ${escapeHtml(text)}
            </div>
        `;
        
        messagesContainer.appendChild(messageEl);
        scrollToBottom();
    }

    function addSystemMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'system-message';
        msg.textContent = text;
        messagesContainer.appendChild(msg);
        scrollToBottom();
    }

    // Helpers
    function updateStatus(text, type) {
        statusText.textContent = text;
        statusCircle.className = `status-indicator ${type}`;
    }

    function enableChat(enabled) {
        messageInput.disabled = !enabled;
        sendBtn.disabled = !enabled;
        if (enabled) messageInput.focus();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event Listeners
    connectBtn.addEventListener('click', toggleConnection);
    messageForm.addEventListener('submit', sendMessage);
    
    clearChatBtn.addEventListener('click', () => {
        messagesContainer.innerHTML = '<div class="system-message">Chat history cleared.</div>';
    });

    // Auto-reconnect if needed or handle URL changes
    wsUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') connect();
    });
});
