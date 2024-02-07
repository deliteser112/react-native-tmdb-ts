import React, { createContext, useReducer, useContext } from 'react';

// Define states
interface AppState {
  trendingTVShows: any[];
  popularMovies: any[];
  popularTVShows: any[];
}

// Define the actions
type Action =
  | { type: 'SET_TRENDING_TV_SHOWS'; payload: any[] }
  | { type: 'SET_POPULAR_MOVIES'; payload: any[] }
  | { type: 'SET_POPULAR_TV_SHOWS'; payload: any[] };

// Initial state
const initialState: AppState = {
  trendingTVShows: [],
  popularMovies: [],
  popularTVShows: [],
};

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function to handle state changes based on action
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_TRENDING_TV_SHOWS':
      return { ...state, trendingTVShows: action.payload };
    case 'SET_POPULAR_MOVIES':
      return { ...state, popularMovies: action.payload };
    case 'SET_POPULAR_TV_SHOWS':
      return { ...state, popularTVShows: action.payload };
    default:
      return state;
  }
};

// Define the props for the AppProvider
interface AppProviderProps {
  children: React.ReactNode;
}

// Context provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app state context
export const useAppState = () => useContext(AppContext);
