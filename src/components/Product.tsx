import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router';

type Pro = {
  id: number;
  users: string;
  point: number;
  score: number;
  times: number;
  ratio: number;
  count: number;
};

const Product: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();

  const [teamList, setTeamList] = useState<Pro[]>([]);
  const [id, setId] = useState<number>(1);
  const [team, setTeam] = useState<string>('');

  const nullTeam = () => {
    setTeam(' ');
    console.log(team);
  };
  const defaultTeam = () => {
    setTeam(team.slice(1));
  };

  const handlePutTeam = () => {
    if (team) {
      setTeamList([
        ...teamList,
        { id: id, users: team, point: 0, score: 0, times: 0, ratio: 0, count: 0 },
      ]);
      setTeam('');
      setId(id + 1);
    }
  };

  //チーム名を入力して登録する
  const teamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (team.length < 33) {
      setTeam(event.target.value);
      console.log(team);
    }
  };
  console.log(teamList);

  return (
    <>
      <div className='Product'>
        <div className='ProductTitle'>【{name}】</div>
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
            <button className='ProductButton__button' type='submit' onClick={handlePutTeam}>
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
          {teamList.length > 0 && (
            <ul className='List'>
              {teamList.map((team) => (
                <li key={team.id} className='ListTop'>
                  <div className='ListBody id'>{team.id}</div>
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

export default Product;
