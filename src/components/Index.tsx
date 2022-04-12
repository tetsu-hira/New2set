import React, { useState } from 'react';
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
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          console.log();
          setCount(window.myAPI.counter(count));
        }}
      >
        count
      </button>
    </>
  );
};

export default Index;
