import { createContext, useEffect } from "react";
import { pokemonBattleMachine } from "../stateMachine/pokemonState";
import { useMachine } from "@xstate/react";
import { interpret } from "xstate";

export const GlobalStateContext = createContext({} as any);

interface Props {
  children: JSX.Element;
}
export const GlobalStateProvider = ({ children }: Props) => {
  useEffect(() => {
    const startMachine = () => interpret(pokemonBattleMachine).start();
    startMachine();
  }, []);

  const [state, send] = useMachine(pokemonBattleMachine);

  return (
    <GlobalStateContext.Provider value={{ state, send }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
