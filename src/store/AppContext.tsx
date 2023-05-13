import * as React from "react";
import { useReducer } from "react";
import { defaultTimeBetweenSlides } from "../utilities/constants";

export const setTimeBetweenSlides = (time: string) => ({
  type: "setTimeBetweenSlides",
  payload: time,
});

export type InitialStateType = {
  timeBetweenSlides: number;
};

export const initialState: InitialStateType = {
  timeBetweenSlides: defaultTimeBetweenSlides,
};

export const reducer = (
  state: InitialStateType,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "setTimeBetweenSlides":
      try {
        const num = parseInt(action.payload);

        if (!isNaN(num)) {
          return {
            ...state,
            timeBetweenSlides: num,
          };
        }
        return {
          ...state,
          timeBetweenSlides: 0,
        };
      } catch {}
      return state;

    default:
      return state;
  }
};

export const AppContext = React.createContext<{
  appState: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  appState: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
