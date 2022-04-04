import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import allActions from '../actions';

type RootState = {
  counter: number;
  currentUser: string[];
  entryItem: string;
};

const Test: React.FC = () => {
  const [item, setitem] = useState<string>('');
  const counter = useSelector((state: RootState) => state.counter);
  const currentUser = useSelector((state: any) => state.currentUser);
  const entryItem = useSelector((state: RootState) => state.entryItem);

  const dispatch = useDispatch();

  const user = { name: 'Rei' };

  const itemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (item.length < 33) {
      setitem(event.target.value);
      console.log(item);
    }
  };

  useEffect(() => {
    dispatch(allActions.userActions.setUser(user.name));
  }, []);

  console.log(entryItem);

  return (
    <>
      <div>
        {currentUser.loggedIn ? (
          <>
            <h1>Hello, {currentUser.user}</h1>
            <button onClick={() => dispatch(allActions.userActions.logOut())}>Logout</button>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <button onClick={() => dispatch(allActions.userActions.setUser(user.name))}>
              Login as Rei
            </button>
          </>
        )}
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(allActions.counterActions.increment())}>
          Increase Counter
        </button>
        <button onClick={() => dispatch(allActions.counterActions.decrement())}>
          Decrease Counter
        </button>
      </div>
      <div>
        <h1>Entry Test!!!</h1>
        <input onChange={itemName}></input>
        <button onClick={() => dispatch(allActions.entryAction.addItem(item))}>Entry</button>
      </div>
    </>
  );
};

export default Test;
