import React, { createContext, useReducer, useState, useEffect } from 'react';

// Set up Initial State
const initialState = {
  isSignedIn: false,
  currUser: null,
  favorites: [],
  clientId:
    '615286336479-bfng52a7akti075n3s59phgmuk3me6qh.apps.googleusercontent.com',
};
const store = createContext(initialState);
const { Provider } = store;

function reducer(state, action) {
  const { clientId, favorites: curr, currUser } = state;
  const { url } = action;
  let newArr;
  function binSearch(start) {
    const len = start.length;
    const mid = Math.floor(len / 2);
    switch (len) {
      case 0:
        console.log('non-existent!');
        return -1;
      case 1:
        if (start[0] === url) {
          return 0;
        }
        console.log('non-existent!');
        return -1;
      default:
        if (start[mid] === url) {
          return mid;
        }
        if (start[mid] < url) {
          return mid + 1 + binSearch(start.slice(mid + 1));
        }
        return binSearch(start.slice(0, mid));
    }
  }
  function linSearch(start) {
    const len = start.length;
    for (let i = 0; i < len; i += 1) {
      if (start[i] === url) {
        return i;
      }
    }
    return -1;
  }
  switch (action.type) {
    case 'signIn':
      return {
        isSignedIn: true,
        currUser: action.user,
        favorites: curr,
        clientId,
      };
    case 'like':
      curr.push(url);
      // curr.sort(); only if using 'binSearch' above
      newArr = curr.slice(0);
      return {
        isSignedIn: true,
        currUser,
        favorites: newArr,
        clientId,
      };
    case 'unlike':
      // curr.splice(binSearch(curr), 1);
      curr.splice(linSearch(curr), 1);
      newArr = curr.slice(0);
      return {
        isSignedIn: true,
        currUser,
        favorites: newArr,
        clientId,
      };
    default:
      return initialState;
  }
}
const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
const makeWidth = () => {
  const temp = window.innerWidth;
  if (temp >= 1200) {
    return 1110;
  }
  if (temp >= 992) {
    return 930;
  }
  if (temp >= 768) {
    return 690;
  }
  if (temp >= 576) {
    return 510;
  }
  return temp - 30;
};
const useWidth = () => {
  const [width, setWidth] = useState(makeWidth());
  useEffect(() => {
    const listener = () => setWidth(makeWidth());
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);
  return width;
};

export { store, AppContext, useWidth };
