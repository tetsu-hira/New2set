import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router';

type Pro = {
  id: number;
  name: string;
  point: number;
  score: number;
  volume: number;
  set: number;
  count: number;
};

const Product: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();

  const [teamList, setTeamList] = useState<Pro[]>([]);
  const [id, setId] = useState<number>(0);
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
        { id: id, name: team, point: 0, score: 0, volume: 0, set: 0, count: 0 },
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
              登録
            </button>
          </div>
          <div className='ProductFlex'>
            <div className='ProductHead'>No.</div>
            <div className='ProductHead'>Name</div>
            <div className='ProductHead'>Point</div>
            <div className='ProductHead'>Score</div>
            <div className='ProductHead'>Volume</div>
            <div className='ProductHead'>Set</div>
            <div className='ProductHead'>Count</div>
          </div>
          {teamList.length > 0 && (
            <ul>
              {teamList.map((team) => (
                <li key={team.id}>
                  <div>
                    <div>{team.id}</div>
                    <div>{team.name}</div>
                    <div>{team.point}</div>
                    <div>{team.score}</div>
                    <div>{team.volume}</div>
                    <div>{team.set}</div>
                    <div>{team.count}</div>
                  </div>
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
