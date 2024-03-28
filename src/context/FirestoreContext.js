import { createContext, useReducer, useCallback, useContext } from 'react';

import Firestore from '../handlers/firestore';

export const Context = createContext();

const { readDocs } = Firestore;
const photos = [];
const initialInputs = {
  title: null,
  file: null,
  path: null,
};
const initialState = {
  items: photos,
  placeholders: photos,
  count: photos.length,
  inputs: initialInputs,
  isCollapsed: false,
  search: '',
};

const onChange = (state, e) => {
  if (e.target.name === 'file') {
    return {
      ...state.inputs,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
  } else {
    return { ...state.inputs, title: e.target.value };
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'filterItems':
      return {
        ...state,
        items: action.payload.results,
        search: action.payload.search,
      };
    case 'setItems':
      return {
        ...state,
        items: action.payload.items,
        placeholders: action.payload.items,
      };
    case 'setInputs':
      return {
        ...state,
        inputs: onChange(state, action.payload.value),
      };
    case 'resetInputs':
      return {
        ...state,
        inputs: { ...initialInputs },
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

  const filterItems = useCallback(
    (input) => {
      if (!input) {
        dispatch({
          type: 'setItems',
          payload: { items: state.placeholders, search: '' },
        });
      }

      const results = state.placeholders.filter((item) => {
        const itemTitle = item.title.toLowerCase();
        const searchInput = input.toLowerCase();

        return itemTitle.includes(searchInput);
      });

      dispatch({ type: 'filterItems', payload: { results, search: input } });
    },
    [state, dispatch]
  );

  return (
    <Context.Provider value={{ state, dispatch, read, filterItems }}>
      {children}
    </Context.Provider>
  );
}

export const useFirestoreContext = () => useContext(Context);
export default Provider;
