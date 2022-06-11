### 상세 페이지를 동적인 UI로 만들기

저번에 만들어둔 상세 페이지는 항상 보이도록 두었는데

이를 글 제목을 누를 때 보이도록 만들어 보자.

이러한 동적인 UI 를 만들기 위해서는 다음의 3가지 스텝을 밟는다.

1. UI의 html, css 코드를 완성

2. 해당 UI의 현재 ```state```를 저장

3. 상황에 따른 UI의 ```state```를 정의

우리는 저번에 ```1```의 과정을 수행 하였으므로

```2```과 ```3``` 의 과정을 수행하면 된다.

```2```의 과정으로는 처음에는 UI가 안보이다가 

글제목 클릭 시 보여야 하므로 ```bool```형식의 state가 필요하다.

```jsx
...
function App(){
    ...
    const [modal, setModal]= useState(false) // 초기에는 안보여야 함
    return(
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <div className="list">
                <h4>{글제목[0]}</h4>
                ...
            </div>
            ...
            <Modal/>
        </div>
    )
}
```
그리고 ```3```을 선언하기 위해서는 

조건문을 통해 ```state```값에 따라 처리하도록 정의한다.

또한 ```<Modal/>```컴포넌트를 보이게 하기 위해서는 

글제목을 눌렀을 때 표시해야 하므로

```onClick``` 이벤트를 정의한다.

```jsx
...
function App(){
    ...
    const [modal, setModal]= useState(false) // 초기에는 안보여야 함
    return(
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <div className="list">
                <h4
                 onClick={()=>{
                    setModal(true)
                 }}>{글제목[0]}</h4>
                ...
            </div>
            ...
            {modal ? <Modal/> : null }
        </div>
    )
}
```

### 이번 강의 과제

#### 목표 :

현재는 눌렀을 때 보이는 상세페이지를 다시 OFF 할 수 없다.

다시 글제목을 눌렀을 때 상세페이지를 OFF하도록 변경 해 보자.

#### 나의 해결방법

다시 눌렀을 때 가 중요하므로

onClick 이벤트 헨들러 부분을 조정해야 한다.

따라서 삼항 연산자를 통해 ```modal``` 값에 따라 ```setModal```로 ```state```를 변경하도록 해야 한다.

```jsx
...
<div className="list">
    <h4
         onClick={()=>{
            modal ? setModal(false): setModal(true)
         }}>{ 글제목[0] } 
        ...</h4>
        ...
</div>
```

#### 핵심

동적인 UI를 만들때 중요한 세가지 과정을 리마인드 하며 React를 공부하자.

1. UI의 html, css 만들기

2. UI의 현재 상태 값 ```state```로 정의

3. ```state```에 따른 UI의 변화를 정의


