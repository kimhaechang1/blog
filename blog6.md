### props를 응용한 상세 페이지 만들기

상세페이지(```<Modal>```)을 좀 더 동적인 UI로 만들어 본다.

이번시간은 지금까지 배운걸 활용하여 본인이 혼자서 만들어 보자.

#### 목표 :

글목록의 글제목을 누를 시 아래의 상세 페이지의 제목또한 바뀌도록 만든다.

#### 나의 해결방법

먼저 동적인 UI를 만들기 위한 3가지 규칙을 생각 해 보았을 때

1. UI의 html과 css를 짠다.
-> 이것은 이미 ```function Modal()```과 ```App.css```를 통해 짜여져 있다.

2. 해당 UI의 현재 상태를 기록 한다.
-> 여기서 ```<Modal/>```의 기본 상태는 안보여야 하고
-> ```modalTitle```이라는 state를 통해 글제목의 인덱스 번호를 저장한다.
-> 기본적으로 글제목을 누르지 않았을 때 에는 modalTitle에 아무것도 없어야 하므로 
-> 초기값은 ```null```을 준다.

3. 상황에 따른 UI의 상태를 정의 한다.
-> ```setModalTitle``` 함수를 사용하여 ```글제목.map((title,index)=>{})```에서 index값을 통해 
-> 동적인 제목을 가진 UI를 형성한다

이러한 UI규칙을 사용하며

제목에 대한 ```onClick```이벤트를 사용하여 

클릭된 제목 인덱스와 (```index```) 현재 ```<Modal/>```컴포넌트의 제목 인덱스(```modalTitle```)가 일치 하다면

상세 페이지를 꺼 주도록(```setModal```) 한다.

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

처음 딱 과제를 마주했을 때에는

오랜만에 강의를 들어서 그런지 map함수의 구조부터 파악해야 했었다.

하지만 과거 강의 중 UI 사용규칙 3가지를 떠올리며 하나씩 채워가다보니

강사분의 정답과 변수명만 다르고 구조는 동일했다.
