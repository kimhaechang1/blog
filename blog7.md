### 사용자가 입력한 글 다루기

```input``` 태그를 활용하여 사용자의 입력값을 처리 해 보자.

#### 사용자의 입력값을 받아서 출력 해 보자

```input```태그를 활용하여 사용자의 입력값을 받아서 출력 하려면

이벤트 함수 중 ```onChange```를 사용한다.

```onChange```는 단순히 ```input```태그 속 값이 변경 될때 마다 실행된다.

따라서 ```onChange```이벤트 핸들러에 ```console.log```를 통해 확인 해봐야 하는데

이벤트가 발생한 객체의 ```value```값을 가져와야 한다

이 때 필요한 것이 이벤트 객체 이다.

#### 이벤트 리스너와 이벤트 핸들러

DOM 객체 구조에서 이벤트의 종류는 다양하게 존재한다.

여기서 이벤트는 이벤트 리스너와 이벤트 헨들러로 나눌 수 있다.

이벤트 리스너는 말 그대로 소속 되어있는 DOM 태그에 특정한 이벤트를 

처리하기 위한 함수로서

대표적으로 onClick, onChange 등이 있다.

이벤트 핸들러는 event 객체를 인수로 받으며

이벤트 리스너의 내부에서 동작하고, 해당 이벤트 발생 시 어떠한 동작을 처리 할 것인지 정의한다.

이벤트 객체는 이벤트가 발생한 부분에 대하여 다양한 정보를 담고 있는 객체이다.

주요한 사용방법으로 이벤트가 발생한 태그를 알아보기 위해 

```event.target```을 사용하기도 하며 

해당 태그가 만약 ```input```태그 일 경우 ```value``` 값을 가져오기 위해서

```event.target.value```를 사용하기도 한다.

따라서 이벤트의 처리과정을 단순하게 알아보면

이벤트 리스너가 등록되어 있는 특정 DOM 요소에서 이벤트가 발생하고

브라우저에서 해당 객체의 이벤트 리스너를 호출하여

내부의 이벤트 핸들러가 작동하도록 한다.

#### 이벤트 캡쳐링과 버블링

DOM 객체의 일반적인 이벤트 처리과정은

이벤트 캡쳐링, 타겟, 버블링 이라는 순서를 거친다.

이벤트 캡쳐링 단계에서는

상위 노드에서 부터 이벤트가 발생한 DOM객체까지 이벤트가 전파되고

타깃단계에서 실행 된 후 

다시 버블링 단계에서 상위노드로 올라가며 이벤트가 전파된다.

이 과정 속에서 버블링이 가끔 문제가 될 때가 있다.

우리 blog 로직을 살펴 보면

따봉을 누를 시에도 상세 페이지가 펼쳐지고 따봉 수치도 올라간다.

여기서 사실 따봉은 ```<h4>```태그의 자식 노드인데도 불구하고

상위 노드로의 이벤트 버블링 때문에 상세 페이지도 열리게 되는 것 이다.

이러한 이벤트 버블링을 막기 위해선 

자식노드의 이벤트 발생 지점에서 ```event.stopPropagation``` 을 사용한다.


### 이번 강의 과제

#### 목표 :

1. ```input``` 태그를 활용하여 새로운 글을 추가 하는 기능을 구현하시오

2. ```button``` 태그를 활용하여 해당하는 글을 삭제하는 기능을 구현하시오

#### 나의 해결방법

먼저 현재까지의 구현은 글제목 ```state``` 를 통해 ```array.map```을 돌려서

글 목록을 출력하고 있다.

이를 통해 알 수 있는 방법으로는

글을 추가하기 위해서는 글제목 ```state```에 값을 추가하면 된다. 라는점과

글을 삭제하기 위해서는 글제목 ```state```의 특정 값을 삭제하면 된다. 라는점이다.

결국 글제목 ```state```는 배열의 자료구조 형을 가지고 있으므로

깊은 복사의 과정을 거치고 나서 

```array.splice```와 ```array.push```를 거쳐 삭제/추가 를 구현하면 된다.

```javascript
function App(){
  let [글제목, set글제목] = useState(['남자코트 추천','강남 우동맛집', '파이썬독학'])
  const [따봉, set따봉] = useState([0,0,0])
  const [modal, setModal] = useState(false)
  const [modalTitle,setModalTitle] = useState(null)
  const [inputValue,setInputValue] = useState('');
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
              <div className="list" key={title}>
                <h4 onClick={()=>{
                  if(index === modalTitle){
                    setModal(false)
                    setModalTitle(null)
                  }else{
                    setModal(true)
                    setModalTitle(index)
                  }
                }}>{title} <span onClick={(e)=>{
                  e.stopPropagation()
                  let copy = [...따봉]
                  copy[index] +=1
                  set따봉(copy)
                }}>👍 {따봉[index]}</span></h4>
                <p>2월 17일 발행</p>
                <button onClick={()=>{
                  let copy = [...글제목]
                  copy.splice(index,1)
                  set글제목(copy)
                }}>글삭제</button>
            </div>
            )
          })}
          {modal ? <Modal presentTitle={modalTitle} titles={글제목} /> : null}
          <input onChange={(e)=>{
            setInputValue(e.target.value)
          }}/>
          <button onClick={()=>{
            let copy = [...글제목]
            copy.push(inputValue)
            set글제목(copy)
          }}>제출</button>
      </div>
  )
}
```
#### 좀 더 깔끔한 글 추가하기

우리가 새로운 글을 추가하면 최신글은 젤 위로 가야한다

현재 상황으로는 글이 항상 젤 뒤에 추가 되는데

이는 배열의 가장 뒤에 값을 추가하는 함수인 ```push```를 사용하기 때문이다.

배열의 가장 앞에 추가하기 위해서는 ```unshift```를 사용하자.


#### 핵심

자바스크립트 기본 문법 및 array 조작능력을 키워야 한다.

1. array.push : 배열 젤 뒤에 추가 후 전체 길이 반환
2. array.unshift : 배열 젤 앞에 추가 후 전체 길이 반환
3. array.shift : 배열 젤 앞 요소 삭제 후 삭제된 요소 반환
4. array.pop : 배열 젤 뒷 요소 삭제 후 삭제된 요소 반환
5. array.splice(start, deleteCount, item1, itemt2, ...) : 
start부터 deleteCount 개수만큼 요소 제거

역방향도 가능하며 절댓값 기준으로 start값이 배열의 길이보다 크다면 0으로 결정

deleteCount가 0이하면 어떤 요소도 제거하지 않으며 deleteCount를 생략하거나 

array.length-start 보다 값이 크면 start부터 모든 요소 제거

6. array.slice(begin, end)

begin부터 end인덱스를 제외하고 추출한다.

역방향 역시 가능하며 begin이 undefined 인 경우 0번부터 실행하고

end를 따로 주지 않은 경우 배열의 끝까지 추출한다.

splice와 slice의 차이점을 꼭 이해해두자.
