### 같은 제목을 여러번 눌렀을 시 상세 페이지가 안열리는 문제 발생

#### 목표 :

같은 제목을 누를 시 상세 페이지가 꺼지도록 만들고, 

현재까지의 기능

즉, 서로다른 제목을 눌렀을 때 상세페이지가 바뀌는 기능은 유지한다.

#### 나의 해결방법

지금 나와 있는 ```onclick```이벤트 로직은

```javascript
function App(){
  const [글제목, set글제목] = useState(['남자코트 추천','강남 우동맛집', '파이썬독학'])
  const [따봉, set따봉] = useState([0,0,0])
  const [modal, setModal] = useState(false)
  const [modalTitle,setModalTitle] = useState(null)
  const onClickHandler = ()=>{
    set따봉(따봉+1)
  }
  return(
      <div className="App">
          <div className="black-nav">
              <h4>ReactBlog</h4>
          </div>
          {글제목.map(function (title, index) {
            return(
              <div className="list" key={title.id}>
                <h4 onClick={()=>{
                  index === modalTitle ? setModal(false) : setModal(true)
                  setModalTitle(index)
                }}>{title} <span onClick={()=>{
                  let copy = [...따봉]
                  copy[index] +=1
                  set따봉(copy)
                }}>👍 {따봉[index]}</span></h4>
                <p>2월 17일 발행</p>
            </div>
            )
          })}
          {modal ? <Modal presentTitle={modalTitle} titles={글제목} /> : null}
      </div>
  )
}
```
다음과 같은데

여기서 ```<h4>``` 태그의 ```onclick``` 이벤트 핸들러 함수를 보면

```modalTitle```은 ```state```로서 현재 상세 페이지의 제목의 인덱스 번호를 저장한다.

즉, 현재 상세페이지 제목과 동일한 제목을 목록에서 클릭 했을 경우

상세페이지를 단순히 종료 ```setModal(false)``` 하고

다를 경우에는 유지하며 ```setModalTitle(index)```를 통해 새로운 제목을 전달한다.

여기서 문제점은 한번 종료 되었을 시

아직 ```modalTitle``` 에 이전에 남아있는 상세페이지 제목 인덱스가 있기 때문에

같은 제목을 여러번 눌러도 항상 ```setModal(false)```가 된다.

따라서 만약 같은 제목을 눌렀을 시 

```modalTitle```값을 **초기화** 하여 문제를 해결 할 수 있다.

```javascript
function App(){
  const [글제목, set글제목] = useState(['남자코트 추천','강남 우동맛집', '파이썬독학'])
  const [따봉, set따봉] = useState([0,0,0])
  const [modal, setModal] = useState(false)
  const [modalTitle,setModalTitle] = useState(null)
  const onClickHandler = ()=>{
    set따봉(따봉+1)
  }
  return(
      <div className="App">
          <div className="black-nav">
              <h4>ReactBlog</h4>
          </div>
          {글제목.map(function (title, index) {
            return(
              <div className="list" key={title.id}>
                <h4 onClick={()=>{
                  // 달라진 부분 시작
                  if(index === modalTitle){
                    setModal(false)
                    setModalTitle(null)
                  }else{
                    setModal(true)
                    setModalTitle(index)
                  }
                  // 달라진 부분 끝
                }}>{title} <span onClick={()=>{
                  let copy = [...따봉]
                  copy[index] +=1
                  set따봉(copy)
                }}>👍 {따봉[index]}</span></h4>
                <p>2월 17일 발행</p>
            </div>
            )
          })}
          {modal ? <Modal presentTitle={modalTitle} titles={글제목} /> : null}
      </div>
  )
}
function Modal(props){
  const titleArray = props.titles
  return(
    <div className="modal">
      <h4>{titleArray[props.presentTitle]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}
```

#### 핵심

항상 UI만드는 규칙 3가지를 기억하며

초기화를 잊지말자.
