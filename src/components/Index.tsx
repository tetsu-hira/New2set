import * as React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';

interface Num {
  type: string;
}

interface Par {
  num: number;
  item: string;
}

const initialState = { num: 0, item: 'テスト' };

const reducer = (state: any, action: Num) => {
  switch (action.type) {
    case 'decrement':
      return { ...state, num: state.num - 1 };
    case 'increment':
      return { ...state, num: state.num + 1 };
    case 'test':
      return { ...state, item: state.item + state.item };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const Index: React.FC = () => {
  return (
    <>
      <div>HOME</div>
      <h2>ComponentUseReactRedux</h2>
      <Provider store={store}>
        <ChildComponentUseReactRedux />
      </Provider>
    </>
  );
};

const ChildComponentUseReactRedux = () => {
  const selector = (state: any) => {
    return state.num;
  };

  const num = useSelector(selector);
  const item = useSelector(selector);

  const dispatch = useDispatch();
  return (
    <div>
      <h3>Using useSelector, useDispatch</h3>
      Number: {num}
      Test:{item}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'test' })}>teeeest</button>
    </div>
  );
};

export default Index;
