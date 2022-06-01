import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {
  const post = '강남 우동 맛집'
  const [title1, settitle1] = useState("남자코트 추천")
  const [title2, settitle2] = useState("강남 우동맛집")
  const [title3, settitle3] = useState("파이썬독학")
  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그임</h4>
      </div>
      <div className="list">
        <h4>{title1}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title2}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title3}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
