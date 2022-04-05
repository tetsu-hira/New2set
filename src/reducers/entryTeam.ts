type Act = {
  type: string;
  payload: string;
};

const initialState = {
  teamList: [],
};

const addItem = (array: any, item: any) => {
  return Array.from(new Set([...array, item]));
}; //重複データが入らないようにするための対応

const removeItem = (array: any, item: any) => {
  return array.filter((v: any, i: any) => v !== item);
};

const entryItem = (state: any = initialState, action: Act): any => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        teamList: addItem(state.teamList, action.payload),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        teamList: removeItem(state.teamList, action.payload),
      };
    default:
      return state;
  }
};

export default entryItem;
