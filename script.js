const gptApiUrl = 'https://widipe.com/prompt/gpt?prompt=Namaku%20Indra%20X%20Gpt%20aku%20asisten%20yang%20cerdas%2C%20jawab%20kalau%20namamu%20Indra%20X%20Gpt%2C%20dan%20jawab%20setiap%20pertanyaan%20dengan%20panjang%20rinci%20dan%20detail%2C%20jawab%20lebih%20panjang%20lagi%20kalau%20pertanyaan%20nya%20yang%20bagus%2C%20Ingat%20kamu%20sopan&text=';
const aiProfileUrl = 'https://cdn.meitang.xyz/tmp/bgdx4smh3cq1ta1u0fs2.jpg'; // Ganti dengan URL gambar profil Anda

const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');
let currentQuestion = '';

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
        handleRepeat(); // Repeat dengan pertanyaan yang sama
    };

    const likeButton = document.createElement('button');
    likeButton.classList.add('ai-button');
    likeButton.textContent = 'Like';
    likeButton.onclick = () => {
        alert('Anda menyukai pesan ini!');
    };

    const dislikeButton = document.createElement('button');
    dislikeButton.classList.add('ai-button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.onclick = () => {
        alert('Anda tidak menyukai pesan ini!');
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

async function fetchGPTResponse(userInput) {
    try {
        const response = await fetch(gptApiUrl + encodeURIComponent(userInput), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data && data.result) {
            return data.result;
        } else {
            console.error('Invalid API Response:', data);
            return 'Maaf, terjadi kesalahan.';
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        return 'Maaf, terjadi kesalahan.';
    }
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
            appendAIMessage('Maaf, terjadi kesalahan.');
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
