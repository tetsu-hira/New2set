interface Obj {
  type: string;
  payload: string;
}

const addTeam = (id: string): Obj => {
  return {
    type: 'ADD_Team',
    payload: id,
  };
};
const removeTeam = (id: string): Obj => {
  return {
    type: 'REMOVE_Team',
    payload: id,
  };
};

export default {
  addTeam,
  removeTeam,
};
