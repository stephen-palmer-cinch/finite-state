import { useContext } from "react";
import { GlobalStateContext } from "../context/globalState";
import { State } from "../stateMachine/pokemonState";

export const SomeComponent = () => {
  const { send, state } = useContext(GlobalStateContext);

  return state.matches(State.idle) ? (
    <div>Logged In</div>
  ) : (
    <div>Logged out</div>
  );
};
