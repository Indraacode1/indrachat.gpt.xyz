const gpt4o = (query, system, id) => {
  return new Promise((resolve, reject) => {
    axios.get('https://api.yanzbotz.live/api/ai/gpt-4o', {
      params: {
        query: query,
        system: system,
        id: id,
        apiKey: 'Indra'
      }
    })
    .then(response => resolve(response.data))
    .catch(error => reject(error));
  });
};

export async function fetchGPTResponse(userInput) {
    const lowerUserInput = userInput.toLowerCase();
    const creatorKeywords = ['siapa yang membuatmu', 'siapa penciptamu', 'siapa yang menciptakanmu'];

    // Jika pertanyaan tentang pencipta, jawab secara langsung
    if (creatorKeywords.some(keyword => lowerUserInput.includes(keyword))) {
        return 'Saya dibuat oleh Indra, umur 16 tahun. Dia membuat saya sendiri pada malam hari ketika dia kelas 11 di sekolah.';
    }

    // Buat prompt sistem untuk AI
    const systemPrompt = "Anda adalah asisten AI bernama IndraChat AI, yang selalu membantu dengan jawaban yang akurat dan ramah.";

    try {
        // Panggil API gpt4o dengan prompt dan query pengguna
        const response = await gpt4o(userInput, systemPrompt, '1234');  // ID bisa diganti sesuai kebutuhan

        if (response && response.status === 200) {
            return response.data.response;  // Ambil pesan dari data respons API
        } else {
            console.error('Error:', response);
            return 'Maaf, terjadi kesalahan saat mengambil respons AI.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Maaf, terjadi kesalahan saat menghubungi AI.';
    }
}
