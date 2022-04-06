import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router';

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
  const { id } = useParams<{ id: string | undefined }>();
  const location = useLocation();

  const [teamList, setTeamList] = useState<Pro[]>([]);
  const [idNum, setIdNum] = useState<number>(1);
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

  //チーム名を入力して登録する
  // const teamName = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (team.length < 33) {
  //     setTeam(event.target.value);
  //     console.log(team);
  //   }
  // };
  // console.log(teamList);
  // console.log(id);
  // console.log(location);

  const onButtonClick = () => {
    const new_list = entryTeam.teamList.filter((list: any) =>
      list.param.toString().indexOf(window.location.pathname),
    );
    console.log(entryTeam);
    setTeamList(new_list);
  };

  console.log(entryTeam.teamList);
  const teeeeam = entryTeam.teamList;
  console.log(teamList);

  return (
    <>
      <div className='Product'>
        {entryTeam.teamList.length > 0 && <div>{entryTeam.teamList[0].users}</div>}
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
                dispatch(allActions.teamAction.addTeam(team));
                {
                  onButtonClick;
                }
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
              {entryTeam.teamList
                .filter((list: any) => list.param.toString().indexOf(window.location.pathname))
                .map((team: any, idx: number) => (
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
