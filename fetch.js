const axios = require('axios');

const gpt4o = (text) => {
  const prompt = "Namaku Indra X Gpt aku asisten yang cerdas, jawab kalau namamu Indra X Gpt, dan jawab setiap pertanyaan dengan panjang rinci dan detail, jawab lebih panjang lagi kalau pertanyaannya yang bagus, Ingat kamu sopan";

  return new Promise((resolve, reject) => {
    axios.get('https://widipe.com/prompt/gpt', {
      params: {
        prompt: prompt,
        text: text
      }
    })
    .then(response => {
      if (response.data && response.data.status) {
        resolve(response.data.result);
      } else {
        reject(new Error('API response is not valid'));
      }
    })
    .catch(error => {
      console.error('API Error:', error.response ? error.response.data : error.message);
      reject(error);
    });
  });
};

module.exports = { gpt4o };
