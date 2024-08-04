class State {
  state;

  constructor(initialState) {
    this.state = initialState;
  }

  set(newState) {
    this.state = newState;
  }

  get() {
    return this.state;
  }
}

const useState = (initialState) => {
  const state = new State(initialState);

  const render = () => {
    // 그 state 설정되어있는 html 부분만 리렌더링 -> dom Tree 에서 해당 state 설정된 부분 어떻게 확인?
    const sentence = document.querySelector("span.changed-sentence");
    sentence.innerText = state.get();
  };

  const setState = (newState) => {
    state.set(newState);
    render();
  };

  return [state.get(), setState];
};

const [state, setState] = useState("");

const inputElement = document.querySelector("input");
inputElement.addEventListener("input", (e) => {
  setState(e.target.value);
});
