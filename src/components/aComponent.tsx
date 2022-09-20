import { useActor } from "@xstate/react";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/globalState";
import { Events } from "../stateMachine/types";

export const SomeComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [state, send] = useActor(globalServices.pokemonMachine);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <button onClick={() => send(Events.your_turn)}>Your turn</button>
      <button onClick={() => send(Events.pokemon)}>Pokemon</button>
      <button onClick={() => send(Events.select_next_pokemon)}>
        Select next Pokemon
      </button>
      <button
        onClick={() => send({ type: Events.pokemon_selected, payload: 0 })}
      >
        Pokemon Selected
      </button>
      <button onClick={() => send(Events.moves)}>Moves</button>
      <button onClick={() => send({ type: Events.move_selected, payload: 0 })}>
        Move selected
      </button>
      <button onClick={() => send(Events.items)}>Items</button>
      <button onClick={() => send(Events.run)}>Run</button>
      <button onClick={() => send(Events.items)}>Items</button>
      <button onClick={() => send(Events.poke_ball)}>Pokeball</button>
      <button onClick={() => send(Events.success)}>Success</button>
      <button onClick={() => send(Events.failure)}>Failure</button>
      <button onClick={() => send(Events.cancel)}>Cancel</button>
      <button onClick={() => send({ type: Events.enemy_attack, payload: 0 })}>
        Enemy attack
      </button>
      <button onClick={() => send(Events.damage_taken)}>Damage taken</button>
    </div>
  );
};
