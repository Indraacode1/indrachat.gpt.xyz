async function fetchGPTResponse(text) {
    const apiUrl = 'https://apisku-furina.vercel.app/api/ai/gpt-completions?apikey=indradev';

    // Template untuk prompt
    const requestData = [
        { "role": "user", "content": `${text}` },
        { "role": "assistant", "content": "Nama saya adalah IndraChat Ai. Saya diciptakan oleh Indra untuk membantu Anda dengan berbagai pertanyaan dan informasi yang Anda butuhkan. Apakah ada yang bisa saya bantu?" }
    ];

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (result.status === 200) {
            const message = result.data.msg;
            // Update UI with the result message
            document.getElementById('response').innerText = message;
        } else {
            console.error('Error:', result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
const userInput = "Halo, siapa namamu?"; // Replace with the actual user input
fetchGPTResponse(userInput);
