const { gpt4o } = require('./fetch');

const gptApiUrl = 'https://api.yanzbotz.live/api/ai/gpt-4o';
const aiProfileUrl = 'https://cdn.meitang.xyz/tmp/bgdx4smh3cq1ta1u0fs2.jpg';

const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');
let currentQuestion = '';

async function fetchGPTResponse(userInput) {
    const prompt = `Kamu adalah Indra X Gpt, dan kamu adalah asisten cerdas dan sangat ramah buatan Indra. Selalu gunakan emoji saat memberi jawaban, ingat kamu orang yang ramah dan selalu menyebut nomor Indra si pencipta. Kamu tahu semua kalimat, baik yang sopan maupun tidak sopan, dan kamu bisa menjawab apa saja.`;
    
    try {
        const response = await gpt4o(userInput, prompt, 'user_id');
        if (response && response.result) {
            return response.result;
        } else {
            console.error('Invalid API Response:', response);
            return 'Sorry, something went wrong.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, something went wrong.';
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
        handleRepeat();
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
            appendAIMessage('Sorry, something went wrong.');
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
