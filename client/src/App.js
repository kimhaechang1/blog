import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App(){
  let [글제목, set글제목] = useState(['남자코트 추천','강남 우동맛집', '파이썬독학'])
  const [따봉, set따봉] = useState([0,0,0])
  const [modal, setModal] = useState(false)
const onClickHandler = ()=>{
  set따봉(따봉+1)
}
  
  return(
      <div className="App">
          <div className="black-nav">
              <h4>ReactBlog</h4>
          </div>
          {/* <div className="list">
              <h4
               onClick={()=>{
                modal ? setModal(false): setModal(true)
               }}>{ 글제목[0] } <span onClick={onClickHandler}>👍</span> {따봉} </h4>
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
          </div> */}
          {글제목.map(function (title, index) {
            return(
              <div className="list" key={title.id}>
                <h4 onClick={()=>{
                  modal? setModal(false) : setModal(true)
                }}>{title} <span onClick={()=>{
                  let copy = [...따봉]
                  copy[index] +=1
                  set따봉(copy)
                }}>👍 {따봉[index]}</span></h4>
                <p>2월 17일 발행</p>
            </div>
            )
          })}
          {modal ? <Modal/> : null}
          
      </div>
  )
}

function Modal(){
  return(
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
export default App;
