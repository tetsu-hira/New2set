import * as React from 'react';
import { useState, useEffect } from 'react';

const Index: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Access initial value from session storage
    let pageView: string | number | null = sessionStorage.getItem('0');
    if (pageView == null) {
      // pageviewscountを初期化する
      pageView = 1;
    } else {
      // Increment count
      pageView = Number(pageView) + 1;
    }
    // stateを更新
    sessionStorage.setItem('pageView', String(pageView));
    setCount(pageView);
  }, []); //No dependency to trigger in each page load

  return (
    <>
      <div>HOME</div>
      <div>Page View Count is:</div>
      {count}
    </>
  );
};

export default Index;
