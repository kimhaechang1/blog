### 글 목록 UI 만들기

수많은 블로그 글들이 순서대로 나와있는 것 처럼 UI를 만든다.

in App.js

```jsx
...
return (
    <div className="App">
        <div className="black-nav">
            <h4>블로그임</h4>
        </div>
        <div className="list">
            <h4>글제목</h4>
            <p>2월 17일 발행</p>
        </div>
    </div>
)
```

in App.css

```css
...
div{
    box-sizing:border-box;   
}
.list{
    padding-left:20px;
    text-align:left;
    border-bottom:1px solid grey;
}
.black-nev{
    display:flex;
    background:black;
    width:100%;
    color:white;
    padding-left:20px
}
```

이제 이러한 ```<div className="list"></div>``` 부분을 계속 반복해 나가면 된다.

***
#### 자바스크립트 Destructuring 문법

자바스크립트에서는 array라는 자료구조가 있다.

array 은 다음과 같이 쓸 수 있다.

```javascript
let num = [1,2];
```

여기서 일반적으로 ```num``` 배열에 있는 값을 꺼내고 싶다면

```javascript
let a = num[0]
let b = num[1]
```

이런식으로 **인덱스** 번호를 통해 ```num``` 배열의 값을 꺼낼 수 있다.

여기서 자바스크립트는 더 나아가서 배열의 값을 좀 더 쉽게 가공 할 수 있다.

위의 a, b 변수에 저장하는 장면을 자바스크립트에서 더 쉽게 가공한다면

```javascript
let [a,c] = [1,2]
```

위와 같은 코드로 사용 할 수 있다.
***

### 이번 강의 과제

* 목표 : 글 목록 3개를 만들고 제목부분에 들어갈 3개의 데이터는 state에 저장해본 후에 html에 집어 넣으시오(데이터 바인딩 필수!)

해결방법:

function 속에 useState 3개를 각각 "남자코트 추천", "강남 우동맛집", "파이썬 독학" 으로 작성

작성 시 const로 작성하고 배열 속 첫 번째 값은 title1, title2, title3, ... 
이런식으로 작성

return 문에서 ```<div className="list">```인 구문을 복사 붙여넣기 3회

마지막으로 각각의 제목이 들어가야할 태그인 ```<h4></h4>``` 속에 각각 알맞은 데이터 바인딩 해주기

```javascript
...

const [title1, settitle1] = useState("남자코트 추천")
const [title2, settitle2] = useState("강남 우동맛집")
const [title3, settitle3] = useState("파이썬독학")

...

return(
    <div>
        ...
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
)
...

```





