class PubSub {
  constructor() {
    this.handlers = {};
  }

  // 구독자 = html element
  subscribe(eventName, listener) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = listener;
    }
  }

  // 발행자 = setState 함수 안에서
  publish(eventName, newState) {
    if (this.handlers[eventName]) {
      this.handlers[eventName](newState);
    }
  }
}

const pubsub = new PubSub();

const useState = (initialState) => {
  let state = initialState;

  const setState = (newState) => {
    pubsub.publish("changeState", newState);
  };

  return [state, setState];
};

const [state, setState] = useState("");

// input Element로 state 발행하기
const inputElement = document.querySelector("input");
inputElement.addEventListener("input", (e) => {
  setState(e.target.value);
});

// span Element들이 state 구독하기
pubsub.subscribe("changeState", (newState) => {
  const spanElements = document.querySelectorAll("span.changed-sentence");
  spanElements.forEach((spanElement) => (spanElement.innerText = newState));
});
