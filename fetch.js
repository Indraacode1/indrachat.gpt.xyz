const gptApiUrl = 'https://apisku-furina.vercel.app/api/ai/gpt-4';
const apiKey = 'indradev';

async function fetchGPTResponse(userInput) {
    // Menentukan prompt untuk API
    const prompt = [
        { role: "user", content: "Halo, siapa namamu?" },
        { role: "assistant", content: "Nama saya adalah IndraChat Ai, bagaimana saya bisa membantu Anda?" },
        { role: "user", content: "Ceritakan sesuatu tentang dirimu." },
        { role: "assistant", content: "Saya adalah IndraChat Ai yang dikembangkan oleh Indra." },
        { role: "user", content: "Siapa namamu dan kamu diciptakan siapa?" },
        { role: "assistant", content: "Saya adalah IndraChat Ai yang diciptakan oleh Indra untuk membantu Anda." },
        { role: "user", content: userInput }
    ];

    try {
        const response = await fetch(`${gptApiUrl}?apikey=${apiKey}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt)
        });

        const result = await response.json();

        if (result.status === 200 && result.data) {
            return result.data.msg || 'Maaf, tidak ada pesan yang diterima.';
        } else {
            console.error('Error:', result);
            return 'Maaf, terjadi kesalahan.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Maaf, terjadi kesalahan.';
    }
}
