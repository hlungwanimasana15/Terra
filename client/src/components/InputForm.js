import { useState } from 'react';
import styles from './Form.module.css';


export default function InputForm({ onSubmit }) {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ grade, subject, type });
  };

  return (
   <form onSubmit={handleSubmit} className={styles.container}>
    <h2 className={styles.title}>
      <span className={styles.appName}>Terra</span>
      <br />
      <span className={styles.subtitle}>AI-Powered Educational Content Generator</span>
    </h2>


      <label className={styles.label} htmlFor="grade">Grade</label>
      <select
        id="grade"
        value={grade}
        onChange={e => setGrade(e.target.value)}
        required
        className={styles.select}
      >
        <option value="">Select Grade</option>
        <option value="Grade 5">Grade 5</option>
        <option value="Grade 6">Grade 6</option>
        <option value="Grade 7">Grade 7</option>
        <option value="Grade 8">Grade 8</option>
        <option value="Grade 9">Grade 9</option>
        <option value="Grade 10">Grade 10</option>
      </select>

      <label className={styles.label} htmlFor="subject">Subject</label>
      <input
        id="subject"
        type="text"
        placeholder="e.g. Science"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        required
        className={styles.input}
      />

      <label className={styles.label} htmlFor="content-type">Content Type</label>
      <select
        id="content-type"
        value={type}
        onChange={e => setType(e.target.value)}
        required
        className={styles.select}
      >
        <option value="">Select Content Type</option>
        <option value="Summary">Summary</option>
        <option value="Quiz">Quiz</option>
        <option value="Explanation">Explanation</option>
        <option value="Definations">Definations</option>
        <option value="ExamTips">Exam Tips</option>
      </select>

      <button type="submit" className={styles.button}>
        Generate
      </button>
    </form>

  );
}
