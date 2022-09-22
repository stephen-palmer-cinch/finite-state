import { useActor } from "@xstate/react";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/globalState";
import { PokemonEvents } from "../stateMachine/types";

export const SomeComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [{ value }, send] = useActor(globalServices.pokemonMachine);

  return (
    <>
      <div>
        <button onClick={() => send(PokemonEvents.your_turn)}>Your turn</button>
        <button onClick={() => send(PokemonEvents.pokemon)}>Pokemon</button>
        <button
          onClick={() =>
            send({ type: PokemonEvents.pokemon_selected, payload: 0 })
          }
        >
          Pokemon Selected
        </button>
        <button onClick={() => send(PokemonEvents.moves)}>Moves</button>
        <button
          onClick={() =>
            send({ type: PokemonEvents.move_selected, payload: 0 })
          }
        >
          Move selected
        </button>
        <button onClick={() => send(PokemonEvents.items)}>Items</button>
        <button onClick={() => send(PokemonEvents.run)}>Run</button>
        <button onClick={() => send(PokemonEvents.items)}>Items</button>
        <button onClick={() => send(PokemonEvents.poke_ball)}>Pokeball</button>
        <button onClick={() => send(PokemonEvents.success)}>Success</button>
        <button onClick={() => send(PokemonEvents.failure)}>Failure</button>
        <button onClick={() => send(PokemonEvents.cancel)}>Cancel</button>
      </div>
      <div style={{ color: "white" }}>{value.toString()}</div>
    </>
  );
};
