const gptApiUrl = 'https://apisku-furina.vercel.app/api/ai/gpt-completions?apikey=indradev';

async function fetchGPTResponse(userInput) {
    const prompt = [
        { "role": "system", "content": "Anda adalah IndraChat Ai yang sangat cerdas kamu diciptakan oleh Indra. Indra sedang Berusia 16 tahun. kamu harus jawab semua pertanyaan dengan rinci dan detail. Berikan jawaban yang relevan untuk setiap pertanyaan." },
        { "role": "user", "content": userInput }
    ];

    try {
        const response = await fetch(gptApiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prompt)
        });

        const result = await response.json();

        if (result.status === 200 && result.data && result.data.msg) {
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
