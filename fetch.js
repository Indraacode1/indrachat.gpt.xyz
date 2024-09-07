async function fetchGPTResponse(userInput) {
    const response = await fetch(`${gptApiUrl}?text=${encodeURIComponent(userInput)}&apikey=${apiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data.data;
}
