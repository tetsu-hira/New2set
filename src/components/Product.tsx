import * as React from 'react';
import { useParams, useLocation } from 'react-router';

const Product: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();

  console.log(location);

  return (
    <>
      <div className='Product'>
        <div className='ProductContainer'>
          <div className='ProductTitle'>【{name}】</div>
          <div className='ProductButton'>
            <form>
              <input></input>
              <button>作成する</button>
            </form>
          </div>
          <div className='ProductFlex'>
            <div className='ProductHead'>item1</div>
            <div className='ProductHead'>item2</div>
            <div className='ProductHead'>item3</div>
            <div className='ProductHead'>item4</div>
            <div className='ProductHead'>item5</div>
            <div className='ProductHead'>item6</div>
            <div className='ProductHead'>item7</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
