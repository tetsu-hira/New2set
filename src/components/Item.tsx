import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import allActions from '../actions';

import Sita from './image/sita.svg';

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
type Scr = {
  users: string;
  time1: number;
  time2: number;
  count: number;
  marks: number;
};

const Item: React.FC = () => {
  const { item } = useParams<{ item: string }>();
  const [team, setTeam] = useState<string>('');
  const [plan, setPlan] = useState<Scr[]>([]);
  const [time1, setTime1] = useState<number>(0);
  const [time2, setTime2] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [win, setWin] = useState<number>(0);
  const [lose, setLose] = useState<number>(0);
  const [drawWin, setDrawWin] = useState<number>(0);
  const [drawDraw, setDrawDraw] = useState<number>(0);
  const [drawLose, setDrawLose] = useState<number>(0);

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

  // 対戦表にチームを登録
  const addPlan = (index: number) => {
    const addName: any = List.find((elem: any) => List[index] === elem);
    setPlan([...plan, { users: addName.users, time1: 0, time2: 0, count: 0, marks: 0 }]);
    const result: any = plan.filter((plans) => {
      return plans.users === List[index].users;
    });
    const result1 = result.length + 1;
    List[index].times = result1;
  };

  // 対戦表に登録したチームの取り消し
  const handleRemoveTask = (index: number) => {
    const delTeam: any = plan.find((elem: any) => plan[index] === elem);
    const newPlan = [...plan];
    newPlan.splice(index, 1);
    setPlan(newPlan);
    const result: any = newPlan.filter((plans) => {
      return plans.users === delTeam.users;
    });
    const result1: any = List.find((elem: any) => elem.users === delTeam.users);
    const result2 = result.length;
    result1.times = result2;
  };

  const addTime1 = (index: number, minute: number) => {
    const targetPlan: any = plan.find((elem: any) => plan[index] === elem);
    targetPlan.time1 = targetPlan.time1 + minute;
    setTime1(targetPlan.time1);
    // 奇数か偶数で処理を変える
    if (index % 2 === 0) {
      const nextPlan: any = plan.find((elem: any) => plan[index + 1] === elem);
      targetPlan.count = targetPlan.time1 + targetPlan.time2 - (nextPlan.time1 + nextPlan.time2);
      nextPlan.count = nextPlan.time1 + nextPlan.time2 - (targetPlan.time1 + targetPlan.time2);
      setCount(targetPlan.count);
      if (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 > nextPlan.time2) {
        targetPlan.marks = Number(win);
        nextPlan.marks = Number(lose);
      } else if (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 < nextPlan.time2) {
        targetPlan.marks = Number(lose);
        nextPlan.marks = Number(win);
      } else if (
        (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 > nextPlan.time2) ||
        (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 < nextPlan.time2)
      ) {
        if (targetPlan.time1 + targetPlan.time2 > nextPlan.time1 + nextPlan.time2) {
          targetPlan.marks = Number(drawWin);
          nextPlan.marks = Number(drawLose);
        } else if (targetPlan.time1 + targetPlan.time2 < nextPlan.time1 + nextPlan.time2) {
          targetPlan.marks = Number(drawLose);
          nextPlan.marks = Number(drawWin);
        } else {
          targetPlan.marks = Number(drawDraw);
          nextPlan.marks = Number(drawDraw);
        }
      } else {
        targetPlan.marks = Number(lose);
        nextPlan.marks = Number(lose);
      }
    } else {
      const prevPlan: any = plan.find((elem) => plan[index - 1] === elem);
      targetPlan.count = targetPlan.time1 + targetPlan.time2 - (prevPlan.time1 + prevPlan.time2);
      prevPlan.count = prevPlan.time1 + prevPlan.time2 - (targetPlan.time1 + targetPlan.time2);
      setCount(targetPlan.count);
      if (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 > prevPlan.time2) {
        targetPlan.marks = Number(win);
        prevPlan.marks = Number(lose);
      } else if (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 < prevPlan.time2) {
        targetPlan.marks = Number(lose);
        prevPlan.marks = Number(win);
      } else if (
        (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 > prevPlan.time2) ||
        (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 < prevPlan.time2)
      ) {
        if (targetPlan.time1 + targetPlan.time2 > prevPlan.time1 + prevPlan.time2) {
          targetPlan.marks = Number(drawWin);
          prevPlan.marks = Number(drawLose);
        } else if (targetPlan.time1 + targetPlan.time2 < prevPlan.time1 + prevPlan.time2) {
          targetPlan.marks = Number(drawLose);
          prevPlan.marks = Number(drawWin);
        } else {
          targetPlan.marks = Number(drawDraw);
          prevPlan.marks = Number(drawDraw);
        }
      } else {
        targetPlan.marks = Number(lose);
        prevPlan.marks = Number(lose);
      }
    }
    // ここから繰り返し処理
    for (let i = 0; i < List.length; i++) {
      const countPlan: any = List.find((elem: any) => List[i] === elem);
      // 得失点の合計値をtotalに代入
      const sumCount: any = plan.filter((plans) => {
        return plans.users === countPlan.users;
      });
      const total = sumCount.reduce(function (sum: number, element: any) {
        return sum + element.count;
      }, 0);
      // 合計をListに反映
      const update: any = List.find((elem: any) => elem.users === countPlan.users);
      update.score = total;
      // 勝ち点の合計値をamountに代入
      const sumMarks: any = plan.filter((plans) => {
        return plans.users === countPlan.users;
      });
      const amount = sumMarks.reduce(function (sum: number, element: any) {
        return sum + element.marks;
      }, 0);
      // 合計をListに反映
      const overwrite: any = List.find((elem: any) => elem.users === countPlan.users);
      overwrite.point = amount;
    }
    // ここまで繰り返し
    // コンソールでエラーを回避
    console.log('ここからエラー回避');
    console.log(time1);
    console.log(count);
  };
  const addTime2 = (index: number, minute: number) => {
    const targetPlan: any = plan.find((elem) => plan[index] === elem);
    targetPlan.time2 = targetPlan.time2 + minute;
    setTime2(targetPlan.time2);
    // 奇数か偶数で処理を変える
    if (index % 2 === 0) {
      const nextPlan: any = plan.find((elem) => plan[index + 1] === elem);
      targetPlan.count = targetPlan.time1 + targetPlan.time2 - (nextPlan.time1 + nextPlan.time2);
      nextPlan.count = nextPlan.time1 + nextPlan.time2 - (targetPlan.time1 + targetPlan.time2);
      setCount(targetPlan.count);
      if (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 > nextPlan.time2) {
        targetPlan.marks = Number(win);
        nextPlan.marks = Number(lose);
      } else if (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 < nextPlan.time2) {
        targetPlan.marks = Number(lose);
        nextPlan.marks = Number(win);
      } else if (
        (targetPlan.time1 < nextPlan.time1 && targetPlan.time2 > nextPlan.time2) ||
        (targetPlan.time1 > nextPlan.time1 && targetPlan.time2 < nextPlan.time2)
      ) {
        if (targetPlan.time1 + targetPlan.time2 > nextPlan.time1 + nextPlan.time2) {
          targetPlan.marks = Number(drawWin);
          nextPlan.marks = Number(drawLose);
        } else if (targetPlan.time1 + targetPlan.time2 < nextPlan.time1 + nextPlan.time2) {
          targetPlan.marks = Number(drawLose);
          nextPlan.marks = Number(drawWin);
        } else {
          targetPlan.marks = Number(drawDraw);
          nextPlan.marks = Number(drawDraw);
        }
      } else {
        targetPlan.marks = Number(lose);
        nextPlan.marks = Number(lose);
      }
    } else {
      const prevPlan: any = plan.find((elem) => plan[index - 1] === elem);
      targetPlan.count = targetPlan.time1 + targetPlan.time2 - (prevPlan.time1 + prevPlan.time2);
      prevPlan.count = prevPlan.time1 + prevPlan.time2 - (targetPlan.time1 + targetPlan.time2);
      setCount(targetPlan.count);
      if (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 > prevPlan.time2) {
        targetPlan.marks = Number(win);
        prevPlan.marks = Number(lose);
      } else if (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 < prevPlan.time2) {
        targetPlan.marks = Number(lose);
        prevPlan.marks = Number(win);
      } else if (
        (targetPlan.time1 < prevPlan.time1 && targetPlan.time2 > prevPlan.time2) ||
        (targetPlan.time1 > prevPlan.time1 && targetPlan.time2 < prevPlan.time2)
      ) {
        if (targetPlan.time1 + targetPlan.time2 > prevPlan.time1 + prevPlan.time2) {
          targetPlan.marks = Number(drawWin);
          prevPlan.marks = Number(drawLose);
        } else if (targetPlan.time1 + targetPlan.time2 < prevPlan.time1 + prevPlan.time2) {
          targetPlan.marks = Number(drawLose);
          prevPlan.marks = Number(drawWin);
        } else {
          targetPlan.marks = Number(drawDraw);
          prevPlan.marks = Number(drawDraw);
        }
      } else {
        targetPlan.marks = Number(lose);
        prevPlan.marks = Number(lose);
      }
    }
    // ここから繰り返し処理
    for (let i = 0; i < List.length; i++) {
      const countPlan: any = List.find((elem: any) => List[i] === elem);
      // 得失点の合計値をtotalに代入
      const sumCount: any = plan.filter((plans) => {
        return plans.users === countPlan.users;
      });
      const total = sumCount.reduce(function (sum: number, element: any) {
        return sum + element.count;
      }, 0);
      // 合計をListに反映
      const update: any = List.find((elem: any) => elem.users === countPlan.users);
      update.score = total;
      // 勝ち点の合計値をamountに代入
      const sumMarks: any = plan.filter((plans) => {
        return plans.users === countPlan.users;
      });
      const amount = sumMarks.reduce(function (sum: number, element: any) {
        return sum + element.marks;
      }, 0);
      // 合計をListに反映
      const overwrite: any = List.find((elem: any) => elem.users === countPlan.users);
      overwrite.point = amount;
    }
    // ここまで繰り返し
    // コンソールでエラーを回避
    console.log(time2);
    console.log(count);
  };

  const changeWin = (e: any) => {
    setWin(e.target.value);
    setLose(0);
  };
  const changeDrawWin = (e: any) => {
    setDrawWin(e.target.value);
  };
  const changeDrawDraw = (e: any) => {
    setDrawDraw(e.target.value);
  };
  const changeDrawLose = (e: any) => {
    setDrawLose(e.target.value);
  };

  return (
    <>
      <div className='Product'>
        <div className='ProductTitle'>【{item}】</div>
        <div className='ProductContainer'>
          <div className='ProductTop'>
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
                登録する
              </button>
            </div>
            <div className='Insert'>
              <div className='InsertContent'>
                <div className='InsertContent__text'>WW</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='win'
                  onChange={changeWin}
                ></input>
              </div>
              <div className='InsertContent'>
                <div className='InsertContent__text'>DW</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='draw_win'
                  onChange={changeDrawWin}
                ></input>
              </div>
              <div className='InsertContent'>
                <div className='InsertContent__text'>DD</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='draw_draw'
                  onChange={changeDrawDraw}
                ></input>
              </div>
              <div className='InsertContent'>
                <div className='InsertContent__text'>DL</div>
                <input
                  className='InsertContent__entry'
                  type='number'
                  id='draw_lose'
                  onChange={changeDrawLose}
                ></input>
              </div>
            </div>
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
                  <div className='ListBody users'>
                    {team.users}
                    <button className='ListButton' onClick={() => addPlan(idx)}>
                      <img src={Sita} alt='下矢印' width='23px' height='16px' />
                    </button>
                  </div>
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
      {plan.length > 0 && (
        <div className='Result'>
          {plan.map((item, idx: number) => (
            <div className='Result__Border'>
              <div className='Result__Flex' key={idx}>
                <div className={idx % 2 === 0 ? 'Flex left' : 'Flex right'} key={idx}>
                  {idx % 2 === 0 && (
                    <div className='FlexNumber'>
                      <div className='FlexNumber__item'>No.{idx / 2 + 1}</div>
                    </div>
                  )}
                  {idx % 2 === 0 && (
                    <button className='DeleteButton' onClick={() => handleRemoveTask(idx)}>
                      取消
                    </button>
                  )}
                  <div className='FlexCross'>
                    {idx % 2 !== 0 && <div className='FlexCross__item'>-</div>}
                    {idx % 2 !== 0 && <div className='FlexCross__item'>-</div>}
                  </div>
                  <div className='FlexCount'>
                    {idx % 2 !== 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time1}</div>
                      </div>
                    )}
                    {idx % 2 !== 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time2}</div>
                      </div>
                    )}
                  </div>
                  <div className='FlexCount'>
                    {idx % 2 !== 0 && (
                      <div className='FlexCount__Button'>
                        <button className='AddCount top' onClick={() => addTime1(idx, 5)}>
                          +
                        </button>
                        <button className='SubCount top' onClick={() => addTime1(idx, -1)}>
                          -
                        </button>
                      </div>
                    )}
                    {idx % 2 !== 0 && (
                      <div className='FlexCount__Button'>
                        <button className='AddCount bottom' onClick={() => addTime2(idx, 5)}>
                          +
                        </button>
                        <button className='SubCount bottom' onClick={() => addTime2(idx, -1)}>
                          -
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='FlexName'>
                    <div className='ResultName'>
                      <p className='ResultName__text'>{item.users}</p>
                    </div>
                  </div>
                  <div className='FlexCount'>
                    {idx % 2 === 0 && (
                      <div className='FlexCount__Button'>
                        <button className='SubCount top' onClick={() => addTime1(idx, -1)}>
                          -
                        </button>
                        <button className='AddCount top' onClick={() => addTime1(idx, 5)}>
                          +
                        </button>
                      </div>
                    )}
                    {idx % 2 === 0 && (
                      <div className='FlexCount__Button'>
                        <button className='SubCount bottom' onClick={() => addTime2(idx, -1)}>
                          -
                        </button>
                        <button className='AddCount bottom' onClick={() => addTime2(idx, 5)}>
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='FlexCount'>
                    {idx % 2 === 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time1}</div>
                      </div>
                    )}

                    {idx % 2 === 0 && (
                      <div className='FlexCount__Point'>
                        <div className='ResultTime'>{item.time2}</div>
                      </div>
                    )}
                  </div>
                  {idx % 2 !== 0 && (
                    <button className='DeleteButton' onClick={() => handleRemoveTask(idx)}>
                      取消
                    </button>
                  )}
                </div>
                {idx % 2 === 0 && (
                  <div className='Cross'>
                    <div className='Cross__item'>
                      <div className='Cross__text'>-</div>
                    </div>
                    <div className='Cross__item'>
                      <div className='Cross__text'>-</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Item;
