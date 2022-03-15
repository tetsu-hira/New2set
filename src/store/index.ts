// アプリケーション全体で共有するデータを保管する場所としてstoreが必要
import { createStore } from 'redux';

// stateには初期値が必要
const initialState = {
  count: 1,
};

// stateは唯一reducer関数の中でのみ変更が可能
const reducer = (state = initialState) => {
  return state;
};

// 引数にreducerが必須
const store = createStore(reducer);

export default store;
