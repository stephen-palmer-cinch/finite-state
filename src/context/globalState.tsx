import { createContext } from "react";
import { pokemonBattleMachine } from "../stateMachine/pokemonState";
import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

export const GlobalStateContext = createContext({
  pokemonMachine: {} as InterpreterFrom<typeof pokemonBattleMachine>,
});

interface Props {
  children: JSX.Element;
}
export const GlobalStateProvider = ({ children }: Props) => {
  const pokemonMachine = useInterpret(pokemonBattleMachine);

  return (
    <GlobalStateContext.Provider value={{ pokemonMachine }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
