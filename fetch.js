const axios = require('axios');

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
    .catch(error => {
      console.error('API Error:', error.response ? error.response.data : error.message);
      reject(error);
    });
  });
};

module.exports = { gpt4o };
