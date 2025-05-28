import axios from 'axios';

export async function generateContent({ grade, subject, type }) {
  const response = await axios.post('https://terra-backend3.onrender.com/generate', {
    grade,
    subject,
    type
  });

  return response.data.result;
}

