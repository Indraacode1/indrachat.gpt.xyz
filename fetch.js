const gptApiUrl = 'https://apisku-furina.vercel.app/api/ai/gpt-4';
const apiKey = 'indradev';

async function fetchGPTResponse(userInput) {
    const requestData = [
        { "role": "user", "content": userInput },
        { "role": "assistant", "content": "Nama saya adalah IndraChat Ai. Saya diciptakan oleh Indra untuk membantu Anda dengan berbagai pertanyaan dan informasi yang Anda butuhkan. Apakah ada yang bisa saya bantu?" }
    ];

    try {
        const response = await fetch(gptApiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();

        if (result.status === 200) {
            return result.data.msg;
        } else {
            console.error('Error:', result);
            return 'Sorry, something went wrong.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, something went wrong.';
    }
}
