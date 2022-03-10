import './App.css';
import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Process from './components/Process';

type Doc = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [docu, setDocu] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [rev, setRev] = useState<string>();
  const [title, setTitle] = useState<string>('新しいドキュメントを作成する');
  const [list, setList] = useState<Doc[]>([]);

  const nullDocu = () => {
    setDocu(' ');
    console.log(docu);
  };
  const defaultDocu = () => {
    setDocu(docu.slice(1));
  };
  const handleDocList = () => {
    if (docu) {
      setList([
        ...list,
        {
          id: id,
          name: docu,
        },
      ]);
      setDocu('');
      setId(id + 1);
    }
  };

  // ドキュメントの名前を入力して登録する
  const docuName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocu(event.target.value);
    console.log(docu);
  };
  console.log(list);

  return (
    <HashRouter>
      <Header />
      <div className='App'>
        <div className='Top'>
          <div className='TopContainer'>
            <div className='TopContainer__Left'>
              <div className='TopHead'>
                <div className='TopButton'>
                  <input
                    className='TopButton__name'
                    type='text'
                    id='name'
                    onChange={docuName}
                    value={!docu ? '新しいドキュメントを作成する' : docu}
                    onBlur={defaultDocu}
                    onClick={nullDocu}
                  ></input>
                  <button className='TopButton__button' type='submit' onClick={handleDocList}>
                    作成する
                  </button>
                </div>
                <div className='TopHead__title'>＜ドキュメント一覧＞</div>
              </div>
              <ul className='TopList'>
                {list.map((docu, i) => (
                  <li key={i} className='TopList__item'>
                    <div className='TopList__itemName'>
                      <p>{docu.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='TopContainer__Right'>
              <Routes>
                <Route path='/top' element={<Process />} />
                {/* <Route path="/" element={<Index />} />
                <Route path="/test" element={<Test />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </HashRouter>
  );
};

export default App;
