import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App(){
  let post = '강남 우동 맛집'
  let [글제목, set글제목] = useState(['남자코트 추천','강남 우동맛집', '파이썬독학'])
  const [따봉, set따봉] = useState(0)
  
const onClickHandler = ()=>{
  set따봉(따봉+1)
}
  
  return(
      <div className="App">
          <div className="black-nav">
              <h4>ReactBlog</h4>
          </div>
          <button onClick={()=>{
            let copy = [...글제목]
            copy.sort()
            set글제목(copy)
          }}>정렬하기</button>
          <div className="list">
              <h4>{ 글제목[0] } <span onClick={onClickHandler}>👍</span> {따봉} </h4>
              <p>2월 17일 발행 <span onClick={()=>{
                let copy = [...글제목]
                copy[0]='여자코트 추천'
                set글제목(copy)}}>👩</span></p>
          </div>
          <div className="list">
              <h4>{ 글제목[1] }</h4>
              <p>2월 17일 발행</p>
          </div>
          <div className="list">
              <h4>{ 글제목[2] }</h4>
              <p>2월 17일 발행</p>
          </div>
      </div>
  )
}

export default App;
