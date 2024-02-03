import './App.css';
import MarkdownEditor from './MarkdownEditor';
import { useState } from 'react';
import axios from 'axios';

function App() { 
  const [selectedTag, setSelectedTag] = useState('readings');
  const [value, setvalue] = useState('# Enter your Markdown here');
  const [title, setTitle] = useState('');
  const [band, setBand] = useState('');
  const [answer, setAnswer] = useState('');
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
    console.log(event.target.value)
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBandChange = (event) => {
    setBand(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSendData = () => {
    const answerList = answer.split(', ');

    // Create a JSON object with the markdown content and selected tag
    const data = {
      title: title,
      band: band,
      passages: value,
      answer: answerList
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmQ5MTBkMDczMzhlMjVkYjM1NGQyOSIsInVzZXJuYW1lIjoibHRwIn0.LBF65aU6gF-rj27IGpp525gwe0gkDubcWbeKv21MOcQ';
  
    // Send the data to the server
    axios.post(`http://localhost:5050/${selectedTag}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    })
      .then(response => {
        console.log('Data sent successfully:', response.data);
        setvalue("")
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };
  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Enter band"
          value={band}
          onChange={handleBandChange}
        />
        {(selectedTag === "readings" || selectedTag === "listenings") ?
          <input
            type="text"
            placeholder="Enter answer (separated by commas)"
            value={answer}
            onChange={handleAnswerChange}
          /> : null
        }
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="readings">readings</option>
          <option value="speakings">speakings</option>
          <option value="writings">writings</option>
          <option value="listenings">listenings</option>
        </select>
        <button onClick={handleSendData}>Send Data</button>
      </div>
      <MarkdownEditor markdown={value} setMarkdown={setvalue}/>
    </div>
  );
}

export default App;
