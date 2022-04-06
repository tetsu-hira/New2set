import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import allActions from './actions';
import Header from './components/Header';
import Index from './components/Index';
import Item from './components/Item';
import Process from './components/Process';
import Product from './components/Product';
import Test from './components/Test';

type Doc = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [docu, setDocu] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [list, setList] = useState<Doc[]>([]);
  const [note, setNote] = useState<string | null>('');
  const [item, setItem] = useState<string>('');

  const entryItem = useSelector((state: any) => state.entryItem);
  const dispatch = useDispatch();
  const itemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (item) {
      if (item.length < 33) {
        setItem(event.target.value);
        console.log(item);
      }
    }
  };
  const defaultItem = () => {
    setItem(item.slice(1));
    console.log(item);
  };
  const nullItem = () => {
    setItem(' ');
    console.log(item);
  };

  const nullDocu = () => {
    setDocu(' ');
    console.log(docu);
  };
  const defaultDocu = () => {
    setDocu(docu.slice(1));
  };

  console.log(entryItem.itemList);

  // ドキュメントの名前を入力して登録する
  const docuName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (docu.length < 33) {
      setDocu(event.target.value);
      console.log(docu);
    }
  };
  // console.log(list);

  return (
    <BrowserRouter>
      <Header />
      <div className='App'>
        <div className='Top'>
          <div className='TopContainer'>
            <div className='TopContainer__Left'>
              {/* Reduxを使ったテスト */}
              <div className='TopHead'>
                <div className='TopButton'>
                  <input
                    className='TopButton__name'
                    type='text'
                    id='name'
                    onChange={itemName}
                    value={!item ? '新しいドキュメントを作成する' : item}
                    onBlur={defaultItem}
                    onClick={nullItem}
                  ></input>
                  <button
                    onClick={() => dispatch(allActions.entryAction.addItem(item))}
                    className='TopButton__button'
                  >
                    作成する
                  </button>
                </div>
                <div className='TopHead__title'>＜ドキュメント一覧＞</div>
              </div>
              <ul className='TopList'>
                {entryItem.itemList.map((item: any) => (
                  <li key={item} className='TopList__item'>
                    <div className='TopList__itemName'>
                      <Link to={`./${item}`} className='TopList__itemName'>
                        <p>{item}</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='TopContainer__Right'>
              <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/top' element={<Process />} />
                <Route path='/test' element={<Test />} />
                <Route path='/:id/:name' element={<Product />} />
                <Route path='/:item' element={<Item />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
