### 반복문으로 같은 html 반복생성

반복문에는 여러가지 종류가 있으나

오늘은 **map** 함수를 통해 반복되는 html을 처리해보자.

***
#### 자바스크립트 함수 : map()

```map()```은 ```array``` 타입의 자료구조에서 쓸 수 있는 함수로서

기본적인 기능은 배열의 원소 개수만큼 반복한다는 점이다.

이제 ```map()```안에 들어가는 요소는 콜백함수가 있는데

첫 번째 인자는 ```element```로서 배열의 원소들을 하나씩 들고온다.

두 번째 인자는 ```index```로서 배열의 인덱스를 하나씩 꺼낸다.

그리고 ```return```문으로 빠져나간 값을 원소로 가지는 배열을 반환한다.

리액트에서는 자바스크립트 배열 속 html태그도 

알아서 배열을 해체하여 html태그로 인식하기 때문에 배열인 체로 두어도 상관없다.

다음의 예제는 배열의 원소를 ```map()```을 통해 인덱스와 함께 꺼내어 ```<div>``` 태그를 달고 출력한다.

```javascript
[1,2,3].map(function(element, index){
    return (
        <div>{element} {index}</div>
    )
})
```
***

먼저 지금 까지 작성한 ```className="list"``` 인 부분

즉, 글 리스트를 모두 주석처리 해 주자.

그리고 ```map```을 통해 원래 ```className="list"```의 ```<div>``` 태그 부분을

글제목 배열에 따라 처리 되도록 정의 하자.

또한 원래 글 제목을 누르면 상세 페이지가 적용되던 것도 

똑같이 반복적으로 구현 되도록 정의 하자.

***
#### 리액트에서 key

일반적으로 리액트에서 DOM 객체의 변경이 일어났을 경우가

두 가지 존재한다.

1. 엘리먼트 타입이 다른 경우

2. 엘리먼트 타입이 같은경우


엘리먼트 타입이 다른 경우 에서는 

이전의 DOM 노드를 완전히 제거하고 새로운 DOM노드를 제거한 자리에 추가한다.

엘리먼트 타입이 같은 경우에서는

해당 엘리먼트의 속성을 비교하여 변경 된 부분만을 갱신한다.

그리고 이러한 DOM 객체의 변경에서 자식노드가 있는 경우엔

자식노드를 순차적으로 방문하여 차이점을 갱신한다.

이 때 추가적인 DOM 노드가 가장 마지막에 존재한다면 큰 문제는 없지만

추가적인 DOM 노드가 가장 첫 번째 자식으로 추가 된 경우

React에서는 모든 자식을 재구성 하려고 하게 되어 비효율적이게 된다.

이 때 필요한 것이 ```key``` 속성이다.

위의 비효율적인 상황에서 ```key``` 값이 존재하는 경우

React에서는 단순히 새로운 key값을 가진 노드가 추가 되었고

다른 노드들을 뒤로 밀면 된다는 것을 알 수 있게 된다.

일반적으로 아무런 ```key``` 값을 정해주지 않는다면

```key```는 자동으로 ```index```로 설정된다.

그렇지만 이렇게 ```index```를 ```key```값으로 가지는 것은 좋지 못하다.

왜냐하면 ```index```값이 달라지는 경우(```state```로 정의 되어 있거나)가 생기면 

실제 렌더링 되는 순서가 엉망이 될 수 있기 때문이다.

따라서 ```key```값은 보통 절대 변하지 않는 ```id```와 같은 값을 주는것이 바람직하다.

***

```jsx
...
function App(){
    ...
    return(
        <div class="App">
            ...

            {
                글제목.map(function(title, index){
                    return(
                        <div className="list" key={title.id}>
                            <h4 onClick={()=>{
                                modal ? setModal(false) : setModal(true)
                            }}>{title}</h4>
                            <p>2월 17일 발행</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
```

### 이번 강의 과제

#### 목표 :

현재까지 배운 ```map```과 ```state```를 통하여

따봉을 구현한다.

단, 현재의 따봉 ```state``` 는 다양한 종류의 따봉을 처리하지 못한다.

따라서 각각의 제목별 따봉을 각각 카운팅 하도록 만들어 보자.

#### 나의 해결방법

다양한 따봉을 처리하기 위해서 현재의 따봉 ```state```를

배열로 처리하고 ```<span>```태그로 👍를 html로 표시 한 뒤

```onClick```이벤트를 처리하여 ```state```값을 변경하는데

이 때 저번에도 배운 것 처럼 ```deepcopy```를 통해 

새로운 배열을 ```set따봉```을 통해 적용 시킨다.

```jsx
    const [따봉, set따봉] = useState([0,0,0])
    ...
    <div>
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
```


#### 핵심

배열로 된 ```state```는 꼭 깊은 복사를 해서 해결하도록 하고

```map()``` 함수를 좀 더 다양한 곳에 써서 반복적인 코드를 줄여 보자

