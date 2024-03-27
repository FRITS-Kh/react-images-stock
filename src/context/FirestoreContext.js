import { createContext, useReducer, useCallback } from 'react';

import Firestore from '../handlers/firestore';

export const Context = createContext();

const { readDocs } = Firestore;
const photos = [];
const initialInputs = {
  title: null,
  file: null,
  path: null,
  // createdAt: null,
  // user: null,
};
const initialState = {
  items: photos,
  count: photos.length,
  inputs: initialInputs,
  isCollapsed: false,
};

const onChange = (state, e) => {
  if (e.target.name === 'file') {
    // const currentDate = new Date();
    // const timestamp = {
    //   seconds: Math.floor(currentDate.getTime() / 1000),
    //   nanoseconds: currentDate.getMilliseconds() * 1000000,
    // };

    return {
      ...state.inputs,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
      // createdAt: timestamp,
    };
  } else {
    return { ...state.inputs, title: e.target.value };
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'setItem':
      return {
        ...state,
        items: [state.inputs, ...state.items],
        count: state.items.length + 1,
        inputs: { ...initialInputs },
      };
    case 'setItems':
      return {
        ...state,
        items: action.payload.items,
      };
    case 'setInputs':
      return {
        ...state,
        inputs: onChange(state, action.payload.value),
      };
    case 'setCollapse':
      return {
        ...state,
        isCollapsed: action.payload.isCollapsed,
      };
    default:
      return state;
  }
}

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const read = useCallback(async () => {
    const items = await readDocs('stocks');

    dispatch({ type: 'setItems', payload: { items } });
  }, [dispatch]);

  return (
    <Context.Provider value={{ state, dispatch, read }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
