***
#### Waring 뜨는것들 제거하는 법

App.js위에 ```/* eslint-disable */``` 를 적어놓자

***

### 버튼에 기능개발을 해보자 & 리액트 state 변경하는 법

우리의 blog App에 좋아요 버튼과 그 수를 제목 옆에 표시하려고 한다.

여기서 좋아요 버튼은 그냥 ```<button>```으로 만들면 밋밋하니...

```<span>``` 태그로 버튼을 만들어 ```onClick```이벤트를 달아준다.

좋아요 값은 수치로 표현하여 나타 낼 것 이다.

여기서 중요한 점은 좋아요 값은 사용자의 입력에 의해 변해야 하므로

```useState``` 로 표현해주어야 한다.

```jsx
...
let [따봉, set따봉] = useState(0)

return (
    <div className="App">
        <div className="black-nav">
            <h4>ReactBlog</h4>
        </div>
        <div>
            <h4>{글제목[0]} <span onClick={}>👍</span> <h4> {따봉} </h4></h4>
        </div>
    </div>
)

```
***
#### 👍과 같은 이모티콘은 어디서 구했지??

크롬 브라우저를 키고 url칸에 우클릭 하면 ```그림 이모티콘``` 이 있다.

여기서 골라서 ```copy-paste``` 해주면 끝!

***

#### onClick 이벤트 처리

위의 코드에서 ```<span>``` 우리가 의도 한 대로 사용자가 버튼을 누를 때

state 따봉의 숫자가 올라야 한다

그렇게 만들기 위해서는

```onClick``` 이벤트 핸들러 함수를 정의 해야 하는데

```<span onClick={function(){ ... }}>``` 과 같이 정의 해 주어도 되고

```<span onClick={()=>{ ... }}>``` 과 같이 정의 해 주어도 되고

```jsx
function onClickHandler(){
    ...
}
...
<span onClick={onClickHandler}>👍</span>
```
과 같이 ```onClickHandler``` 라는 이벤트 핸들러 함수를 직접 따로 정의 하여도 된다.

어떻게 정의 하던 간에

중요한 것은

state의 값을 변경 할 때는 useState로 정의 해둔 배열에 2번째 인덱스를 사용 해야한다.

즉

```jsx

const [따봉, set따봉]  = useState(0) 
```
에서 ```set따봉```함수를 사용 하여야만 state값이 변경한다.

따라서 최종적으로 정의 해 보면

```jsx
...
let [따봉, set따봉] = useState(0)

return (
    <div className="App">
        <div className="black-nav">
            <h4>ReactBlog</h4>
        </div>
        <div>
            <h4>{글제목[0]} <span onClick={()=>{set따봉(따봉+1)}}>👍</span> <h4> {따봉} </h4></h4>
        </div>
    </div>
)
```


### 이번 강의 과제

#### 목표 :

첫 글에 버튼을 하나 만들고

버튼을 누를 시 첫 글의 제목이 '여자코트 추천'으로 바뀌는 기능 만들기

#### 나의 해결방법

2월 17일 발행 옆에 👩 모양 ```<span>```태그 버튼을 만들고

해당 버튼을 누를 시 ```onClick``` 이벤트가 발생 되도록 하며

이벤트 핸들러 함수를 정의 하고, 해당 함수는 ```set글제목```을 통해

글제목 목록 배열을 ```['여자코트 추천', 글제목[1],글제목[2]]``` 로 하여 state값을 변경하면 된다.

```jsx
function App(){
  let post = '강남 우동 맛집'
  let [글제목, set글제목] = useState(['남자코트 추천','강남 우동맛집', '파이썬독학'])
  ...
  
  return(
      <div className="App">
          <div className="black-nav">
              <h4>ReactBlog</h4>
          </div>
          <div className="list">
              <h4>{ 글제목[0] } <span onClick={onClickHandler}>👍</span> {따봉} </h4>
              <p>2월 17일 발행 <span onClick={()=>{set글제목(['여자코트 추천',글제목[1],글제목[2]])}}>👩</span></p>
            </div>
        </div>
        ...
  )
}

```

#### 더 효율적인 정답

우리가 일반적으로 이렇게 연습 할 때는 상관없지만

실무나 실제 상황 일 때는 원본 데이터를 저장 해 놓는것이 중요하다.

따라서 ```onClick``` 이벤트 핸들러에서 ```글제목``` state를 copy라는 변수에 저장 한 뒤 

변경이 필요한 state만 변경 해 준 후 ```set글제목```을 통해 반영 해 준다.

```jsx
...
return(
    ...
    <div className="list">
        ...
        <p>2월 17일 발행 <span onClick={()=>{
            let copy = 글제목
            copy[0] = '여자코트 추천'
            set글제목(copy)
        }}>👩</span></p>
    </div>
)
```

하지만 이렇게 해 주어도 state 값은 변하지 않는다.


#### 왜 변하지 않을까?

우리가 ```글제목``` state를 배열로 정의 해 두었기 때문이다.

자바스크립트에서 state나 object 타입은 **reference data type** 이므로 **깊은 복사**를 진행 해 주어야 한다.

따라서 위의 코드를 정상적으로 동작하도록 변경 하기 위해서는

```jsx
...
return(
    ...
    <div className="list">
        ...
        <p>2월 17일 발행 <span onClick={()=>{
            let copy = [...글제목] // 깊은 복사
            copy[0] = '여자코트 추천'
            set글제목(copy)
        }}>👩</span></p>
    </div>
)
```

***
#### 간단하게 알아보는 깊은복사 와 얕은 복사

array, object 타입을 정의 하면 

정의 해둔 변수가 그 값을 가지는 것이 아닌

그 값이 저장되어 있는 주소, 즉 포인터 값 만을 가진다.

따라서 다른 변수에다가 정의 해 둔 변수를 옮긴다 한들

가리키는 곳이 동일하게 되므로 결국 같은 값이 된다.

이것이 얕은 복사 이며,

여기서 깊은 복사를 하기 위해서는 

변수에 이전의 array 혹은 object 의 원소들을 그대로 들고와야 한다.

```javascript

let arr = [1,2,3]

let shallowCopy = arr // 얕은 복사

let deepCopty = [...arr] // 깊은 복사
```

#### 점 3개의 의미

spread operator 로서 array나 object 자료형 왼쪽에 붙일 수 있다.

기능으로는 말그대로 array나 object를 전개해준다.

위의 ```[...arr]``` 상황으로 따져 본다면

arr 내부의 배열로 이루어진 값들을 전개하고 

다시 배열로 만든다는 의미가 된다.

또한 이미 존재하는 배열에 다른 배열의 원소를 추가 할 때도 편하게 사용된다

```javascript
var parts = ['shoulders', 'knees']
var lyrics = ['head', ...parts,'and','toes']

// ["head", "shoulders", "knees", "and", "toes"]
```
***

#### 핵심

state는 사용자에 입력에 따라 변경되는 값들이지만

초기의 값을 항상 알고 있어야 비교를 할 수 있다.

따라서 배열이나 object 타입을 변경 할 때는 꼭 깊은 복사를 해놓자






