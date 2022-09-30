import { Actions, assign, createMachine } from "xstate";
import { initialContext, pokemonBattleMachine } from "./pokemonState";
import { GameEvents, PokemonContext } from "./types";

const whosThatPokemon = async () => {
  const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  return pokemon.json();
};

type WhosThatPokemonContext = {
  pokemon: string;
  theirPokemon: string;
};

type WhosThatPokemonEvents = { type: "POKEMON"; value?: string };

enum WhosThatPokemonState {
  idle = "idle",
  fetch_pokemon = "fetch_pokemon",
  done = "done",
}

export const somethingMachine = createMachine({
  id: "whos-that-pokemon",
  schema: {
    context: {} as WhosThatPokemonContext,
    events: {} as WhosThatPokemonEvents,
  },
  context: { pokemon: "", theirPokemon: "" },
  initial: "idle",
  states: {
    idle: {
      invoke: { id: "pokemoneState", src: pokemonBattleMachine },
      //@ts-ignore next-line
      on: {
        POKEMON: {
          actions: assign({
            theirPokemon: (context: any, event: any) => event.payload,
          }),
          target: "fetch_pokemon",
        },
      },
    },
    fetch_pokemon: {
      //@ts-ignore next-line
      invoke: {
        src: async () => await whosThatPokemon(),
        onDone: {
          actions: assign({
            //@ts-ignore next-line
            pokemon: (context: WhosThatPokemonState, event) => event.data.name,
          }),
          target: "done",
        },
      },
    },
    done: { type: "final" },
  },
});
