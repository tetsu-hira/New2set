type Act = {
  type: string;
  payload: string;
};

const initialState = {
  teamList: [],
};

const addTeam = (array: any, team: any) => {
  return Array.from(
    new Set([
      ...array,
      {
        users: team,
        point: 0,
        score: 0,
        times: 0,
        ratio: 0,
        count: 0,
        param: window.location.pathname,
      },
    ]),
  );
}; //重複データが入らないようにするための対応

const removeTeam = (array: any, team: any) => {
  return array.filter((v: any, i: any) => v !== team);
};

const entryTeam = (state: any = initialState, action: Act): any => {
  switch (action.type) {
    case 'ADD_Team':
      return {
        ...state,
        teamList: addTeam(state.teamList, action.payload),
      };
    case 'REMOVE_Team':
      return {
        ...state,
        teamList: removeTeam(state.teamList, action.payload),
      };
    default:
      return state;
  }
};

export default entryTeam;
