import axios from 'axios';

export async function generateContent({ grade, subject, type }) {
  const response = await axios.post('http://localhost:5000/generate', {
    grade,
    subject,
    type
  });

  return response.data.result;
}

