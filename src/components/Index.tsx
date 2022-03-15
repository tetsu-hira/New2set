import * as React from 'react';
import { useReducer } from 'react';

import store from '../store';

const initialState = {
  count: 0,
};

const reducer = (state: any, action: any) => {
  if (action === 'INCREMENT') {
    return { count: state.count + 1 };
  } else {
    return { count: state.count - 1 };
  }
};

const Index: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>
        <h1>HOME</h1>
        <p>Count:{store.getState().count}</p>
      </div>
      <div>
        <h1>Counter</h1>
        <h2>カウント：{state.count}</h2>
        <button onClick={() => dispatch('INCREMENT')}>+</button>
        <button onClick={() => dispatch('DECREMENT')}>-</button>
      </div>
    </>
  );
};

export default Index;
