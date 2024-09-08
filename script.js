const gptApiUrl = 'https://api.yanzbotz.live/api/ai/gpt-4o'; // Menggunakan API Yanzbot
const aiProfileUrl = 'https://cdn.meitang.xyz/tmp/bgdx4smh3cq1ta1u0fs2.jpg'; // Ganti dengan URL foto profil Anda

const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');
let currentQuestion = '';

async function fetchGPTResponse(userInput) {
    const systemPrompt = "Nama saya adalah IndraChat Ai. Saya diciptakan oleh Indra, umur 16 tahun, yang membuat saya sendiri waktu malam hari. Dia sekolah baru kelas 11.";
    const id = '12345'; // ID kustom untuk mengidentifikasi sesi/percakapan

    try {
        const response = await fetch(`${gptApiUrl}?query=${encodeURIComponent(userInput)}&system=${encodeURIComponent(systemPrompt)}&id=${id}&apiKey=Indra`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            return result.data;
        } else {
            console.error('Error:', result);
            return 'Maaf, ada kesalahan dalam memproses permintaan Anda.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Maaf, terjadi kesalahan saat menghubungi server.';
    }
}

function appendUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user-message');
    
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = text;

    messageDiv.appendChild(textDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function appendAIMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    const profileImg = document.createElement('img');
    profileImg.classList.add('profile');
    profileImg.src = aiProfileUrl;

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = text;

    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('controls');

    const copyButton = document.createElement('button');
    copyButton.classList.add('ai-button');
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(textDiv.textContent);
    };

    const repeatButton = document.createElement('button');
    repeatButton.classList.add('ai-button');
    repeatButton.textContent = 'Repeat';
    repeatButton.onclick = () => {
        handleRepeat(); // Repeat with the same question
    };

    const likeButton = document.createElement('button');
    likeButton.classList.add('ai-button');
    likeButton.textContent = 'Like';
    likeButton.onclick = () => {
        alert('You liked this message!');
    };

    const dislikeButton = document.createElement('button');
    dislikeButton.classList.add('ai-button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.onclick = () => {
        alert('You disliked this message!');
    };

    controlsDiv.appendChild(copyButton);
    controlsDiv.appendChild(repeatButton);
    controlsDiv.appendChild(likeButton);
    controlsDiv.appendChild(dislikeButton);

    contentDiv.appendChild(profileImg);
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(controlsDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return textDiv;
}

function getTypingSpeed(textLength) {
    const baseSpeed = 50;
    const speedVariance = 20;
    const lengthFactor = Math.max(1, Math.min(textLength / 50, 5));
    return baseSpeed / lengthFactor + Math.random() * speedVariance;
}

async function handleSend() {
    const userInput = input.value.trim();
    if (userInput) {
        appendUserMessage(userInput);
        currentQuestion = userInput;
        input.value = '';

        try {
            const aiText = await fetchGPTResponse(currentQuestion);
            const aiMessageDiv = appendAIMessage('');
            let messageText = aiMessageDiv;

            let index = 0;
            const typingSpeed = getTypingSpeed(aiText.length);

            function typeText() {
                if (index < aiText.length) {
                    messageText.textContent += aiText[index++];
                    setTimeout(typeText, typingSpeed);
                }
            }

            typeText();
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

function handleRepeat() {
    if (currentQuestion) {
        input.value = currentQuestion;
        handleSend();
    }
}

sendButton.addEventListener('click', () => handleSend());

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
    }
});
