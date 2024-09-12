import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // App.css 파일을 임포트하여 스타일 적용

function App() {
  const [diaries, setDiaries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibleDiaryId, setVisibleDiaryId] = useState(null); // 내용 표시 여부를 위한 상태

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get(`${API_URL}/diaries`);
      setDiaries(response.data);
    } catch (error) {
      console.error('Error fetching diaries', error);
    }
  };

  const handleCreateDiary = async () => {
    try {
      await axios.post(`${API_URL}/diaries`, { title, content });
      setTitle('');
      setContent('');
      fetchDiaries();
    } catch (error) {
      console.error('Error creating diary', error);
    }
  };

  const handleDeleteDiary = async (id) => {
    try {
      await axios.delete(`${API_URL}/diaries/${id}`);
      fetchDiaries();
    } catch (error) {
      console.error('Error deleting diary', error);
    }
  };

  const toggleContentVisibility = (id) => {
    setVisibleDiaryId(visibleDiaryId === id ? null : id); // 클릭 시 내용이 보이거나 접히게 함
  };

  return (
    <div className="App">
      {/* public 폴더에 있는 로고 이미지 참조 */}
      <header>
        <img src="/logo192.png" className="logo-spin" alt="logo" />
      </header>
      <h1>일기장인디요?</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleCreateDiary}>Create Diary</button>
      </div>

      <div className="Diaries">
        <h2>Diaries</h2>
        <ul>
          {diaries.map(diary => (
            <li key={diary.id}>
              <div
                className="diary-title"
                onClick={() => toggleContentVisibility(diary.id)}
              >
                {diary.title}
              </div>
              <div className={`diary-content ${visibleDiaryId === diary.id ? 'visible' : ''}`}>
                {diary.content}
              </div>
              <div className="diary-buttons">
                <button className="delete" onClick={() => handleDeleteDiary(diary.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
