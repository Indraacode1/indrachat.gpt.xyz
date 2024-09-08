const gptApiUrl = 'https://widipe.com/prompt/gpt';
const apiKey = 'indradev'; // Update with your actual API key if necessary

async function fetchGPTResponse(userInput) {
    const response = await fetch(`${gptApiUrl}?prompt=Namaku%20Indra%20X%20Gpt%20aku%20asisten%20yang%20cerdas%2C%20jawab%20kalau%20namamu%20Indra%20X%20Gpt%2C%20dan%20jawab%20setiap%20pertanyaan%20dengan%20panjang%20rinci%20dan%20detail%2C%20jawab%20lebih%20panjang%20lagi%20kalau%20pertanyaan%20nya%20yang%20bagus%2C%20Ingat%20kamu%20sopan&text=${encodeURIComponent(userInput)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data.data;
}
