const axios = require('axios');

// Fungsi untuk mendapatkan respons dari API Yanz
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

module.exports = { gpt4o };
