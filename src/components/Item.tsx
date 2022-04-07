import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import allActions from '../actions';

type Pro = {
  idnum: number;
  users: string | undefined;
  point: number;
  score: number;
  times: number;
  ratio: number;
  count: number;
  param: string;
};

const Item: React.FC = () => {
  const { item } = useParams<{ item: string }>();
  const [team, setTeam] = useState<string>('');

  const entryTeam = useSelector((state: any) => state.entryTeam);
  const dispatch = useDispatch();
  const teamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (team) {
      if (team.length < 33) {
        setTeam(event.target.value);
        console.log(team);
      }
    }
  };

  const nullTeam = () => {
    setTeam(' ');
    console.log(team);
  };
  const defaultTeam = () => {
    setTeam(team.slice(1));
  };

  const param = window.location.pathname;
  const List = entryTeam.teamList.filter((item: any) => item.param === param);

  return (
    <>
      <div className='Product'>
        <div className='ProductTitle'>【{item}】</div>
        <div className='ProductContainer'>
          <div className='ProductButton'>
            <input
              className='ProductButton__name'
              type='text'
              id='name'
              onChange={teamName}
              value={!team ? 'メモのタイトル名を入力' : team}
              onBlur={defaultTeam}
              onClick={nullTeam}
            ></input>
            <button
              className='ProductButton__button'
              onClick={() => {
                dispatch(allActions.teamAction.addTeam(team, param));
              }}
            >
              登 録
            </button>
          </div>
          <div className='Item'>
            <div className='ItemHead id'>No.</div>
            <div className='ItemHead users'>Users</div>
            <div className='ItemHead point'>Point</div>
            <div className='ItemHead score'>Score</div>
            <div className='ItemHead times'>Times</div>
            <div className='ItemHead ratio'>Ratio</div>
            <div className='ItemHead count'>Count</div>
          </div>
          {entryTeam.teamList.length > 0 && (
            <ul className='List'>
              {List.map((team: any, idx: number) => (
                <li key={idx} className='ListTop'>
                  <div className='ListBody id'>{idx + 1}</div>
                  <div className='ListBody users'>{team.users}</div>
                  <div className='ListBody point'>{team.point}</div>
                  <div className='ListBody score'>{team.score}</div>
                  <div className='ListBody times'>{team.times}</div>
                  <div className='ListBody ratio'>{team.ratio}</div>
                  <div className='ListBody count'>{team.count}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Item;
