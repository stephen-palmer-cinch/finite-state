import { useActor } from "@xstate/react";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/globalState";
import { charmander, Events } from "../stateMachine/types";

export const SomeComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [state, send] = useActor(globalServices.pokemonMachine);

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <button onClick={() => send(Events.walk)}>Walk</button>
      <button onClick={() => send(Events.encounter)}>Encounter</button>
      <button onClick={() => send(Events.your_turn)}>Your turn</button>
      <button onClick={() => send(Events.pokemon)}>Pokemon</button>
      <button
        onClick={() =>
          send({ type: Events.pokemon_selected, payload: charmander })
        }
      >
        Pokemon Selected
      </button>
    </div>
  );
};
