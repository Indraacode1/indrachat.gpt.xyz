const gptApiUrl = 'https://apisku-furina.vercel.app/api/ai/gpt-completions?apikey=indradev';

async function fetchGPTResponse(userInput) {
    // Deteksi jika ada pertanyaan tentang pencipta AI
    const lowerUserInput = userInput.toLowerCase();
    const creatorKeywords = ['siapa yang membuatmu', 'siapa penciptamu', 'siapa yang menciptakanmu'];

    if (creatorKeywords.some(keyword => lowerUserInput.includes(keyword))) {
        return 'Saya dibuat oleh Indra, umur 16 tahun. Dia membuat saya sendiri pada malam hari ketika dia kelas 11 di sekolah.';
    }

    const prompt = [
        { "role": "system", "content": "Anda adalah asisten AI yang sangat cerdas dan responsif bernama IndraChat AI. Jawablah pertanyaan dengan jelas, tepat, dan mudah dipahami. Jika tidak yakin atau tidak tahu jawabannya, katakan 'Maaf, saya tidak tahu'." },
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
            return 'Maaf, terjadi kesalahan.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Maaf, terjadi kesalahan saat menghubungi AI.';
    }
}
