### 상세페이지 만들기

예를 들어 현재의 블로그 상태에서는 글 제목과 간단한 내용만 나오지만...

이제 제목을 눌렀을 시 상세 내용이 나오는 상세 페이지를 만들어 보자.

당연히 ReactRouter를 아직 배우지 않았기에 새로운 페이지를 쓰진 않고

페이지 아래쪽에 상세 페이지에 들어갈 내용을 넣어 줄 것

아래와 같이 작성한다.

```jsx
function App(){
    return(
        <div className = "App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <div className="list">
                <h4>{글제목[0]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{글제목[1]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{글제목[2]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="modal">
                <h4>제목</h4>
                <p>날짜</p>
                <p>상세내용</p>
            </div>
        </div>
    )

}
```

```css
...
.modal{
  margin-top: 20px;
  padding:20px;
  background:#eee;
  text-align:left;
}
```
그런데 앞으로 개발 해 나갈 ReactBlog의 html 코드를 return문에 다 넣어버리면 너무 복잡 해 진다.

이럴 때 필요한 것이 컴포넌트다.

#### 리액트 컴포넌트

리액트에서는 function을 활용하여 기능에 따라 컴포넌트 화 시킬 수 있다.

우리가 현재 작성하고 있는 ```App.js``` 또한 컴포넌트 이며

App 컴포넌트는 index.js에서 사용되고 있다.

```jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### 컴포넌트 만드는 방법

리액트에서 컴포넌트를 만드려면

1. ```function 컴포넌트 명(){}``` 처럼 함수 정의

2. 함수 내부 return에 넣어 주고싶은 html 코드 작성
(단, 하나의 ```<div>```태그로만 이루어 져야 함)

3. 해당 컴포넌트가 필요한 부분에 ```<컴포넌트명/>``` 넣어주기

이렇게 UI 기능에 따라 컴포넌트로 분리 해 놓으면 가독성 좋은 코드가 완성된다.

이제 Modal 컴포넌트를 만들어서 상세 내용 부분 html코드를 넣어 분리 시켜보자.

```jsx
function App(){
    return(
        <div className = "App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <div className="list">
                <h4>{글제목[0]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{글제목[1]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{글제목[2]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <Modal/>
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
```
***
#### return문 안에 여러 ```<div>```태그를 처리하려면?

왠만하면 return 안에 ```<div>```태그의 수 는 하나인게 좋지만...

여러 ```<div>``` 태그를 쓰고 싶을 경우

혹은 굳이```<div>```태그를 쓰고 싶지 않을 경우

React에는 Fragment라는 태그가 있다.

```<React.Fragment></React.Fragment>``` 가 있으며 

이는 실제 DOM 객체에 반영되지 않는다.

축약형태로 ```<></>``` 로 쓸 수 있다.

***
#### 컴포넌트가 필요한 3가지 조건

컴포넌트도 너무 많이 만들게 되면 

하나의 return문 안에 전부 다 넣는것 마냥 복잡 해 진다.

또한 다른 함수에 있는 state를 마음대로 호출 할 수가 없다.

*따라서 컴포넌트로 만들어야 하나?* 라는 생각이 들 때는

다음의 3가지 조건에 부합하는지 확인 하자.

1. 반복적인 html을 축약 할 때

2. 페이지 전환 할 때에 큰 페이지들

3. 자주 변경이 되는 UI들


### 이번 강의 과제

#### 목표 :

컴포넌트를 하나 만들어 보고 적용도 해 보시오

#### 나의 해결방법

Publish 함수를 만들고 그 함수 내부 return 문에 

```<p>```태그의 내용을 넣는다.

그리고 굳이 DOM 객체에 ```<div>```태그를 추가하지 않아도 되므로

프레그먼트```<></>```를 사용한다.

```jsx

function App(){
    ...
    return(
        ...
        <div className="list">
            <h4>{글제목[0]}</h4>
            <Publish/>
        </div>
        ...
    )
}
...
function Publish(){
    return(
        <>
            <p>2월 17일 발행</p>
        </>
    )
}
```

#### 핵심

컴포넌트를 무분별하게 만들지 말고

컴포넌트가 필요한 상황인지 아닌지 구분을 꼭 하자
