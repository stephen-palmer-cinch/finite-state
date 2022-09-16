import { useEffect, useState } from "react";
import { assign, createMachine, interpret } from "xstate";
import { useMachine } from "@xstate/react";

type Move = {
  name: string;
  damage: number;
};
type Pokemon = {
  name: string;
  totalHp: number;
  currentHp: number;
  moves: Move[];
};
interface Context {
  selected_pokemon: Pokemon;
  available_pokemon: Pokemon[];
  enemy_pokemon: Pokemon;
}

const pikachu: Pokemon = {
  name: "Pikachu",
  totalHp: 120,
  currentHp: 120,
  moves: [
    { name: "takle", damage: 40 },
    { name: "thunderbolt", damage: 60 },
  ],
};

const charmander: Pokemon = {
  name: "Charmander",
  totalHp: 140,
  currentHp: 140,
  moves: [
    { name: "takle", damage: 40 },
    { name: "ember", damage: 50 },
  ],
};

const pidgey: Pokemon = {
  name: "Pidgey",
  totalHp: 100,
  currentHp: 100,
  moves: [
    { name: "takle", damage: 30 },
    { name: "gust", damage: 40 },
  ],
};

const pokemonBattleMachine = createMachine(
  {
    id: "smilesState",
    initial: "idle",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as
        | { type: "WALK" }
        | { type: "ENCOUNTER" }
        | { type: "YOUR_TURN" }
        | { type: "THEIR_TURN" }
        | { type: "POKEMON" }
        | { type: "SELECT_NEXT_POKEMON" }
        | { type: "POKEMON_SELECTED" }
        | { type: "CANCEL" }
        | { type: "ITEMS" }
        | { type: "MOVES" }
        | { type: "MOVE_SELECTED" }
        | { type: "RUN" }
        | { type: "POKE_BALL" }
        | { type: "ENEMY_ATTACK" }
        | { type: "DAMAGE_TAKEN" }
        | { type: "KO" }
        | { type: "SUCCESS" }
        | { type: "FAILURE" }
        | { type: "NO_MORE_POKEMON" },
    },
    context: {
      selected_pokemon: pikachu,
      available_pokemon: [charmander],
      enemy_pokemon: pidgey,
    },
    states: {
      idle: {
        on: {
          WALK: { target: "walking" },
        },
      },
      walking: {
        on: {
          ENCOUNTER: { target: "battle" },
        },
      },
      battle: {
        after: {
          1000: { target: "your_turn" },
        },
      },
      your_turn: {
        on: {
          MOVES: { target: "moves" },
          ITEMS: { target: "items" },
          POKEMON: { target: "pokemon" },
          RUN: { target: "run" },
        },
      },
      their_turn: {
        on: {
          ENEMY_ATTACK: { target: "player_damage_step" },
        },
      },
      moves: {
        on: {
          MOVE_SELECTED: { target: "enemy_damage_step" },
        },
      },
      items: {
        on: { POKE_BALL: { target: "catching" } },
      },
      pokemon: {
        on: {
          POKEMON_SELECTED: { target: "their_turn" },
          CANCEL: { target: "your_turn" },
        },
      },
      run: {
        on: { SUCCESS: { target: "idle" }, FAILURE: { target: "their_turn" } },
      },
      catching: {
        on: {
          SUCCESS: { target: "victory" },
          FAILURE: { target: "their_turn" },
        },
      },
      enemy_damage_step: {
        on: {
          DAMAGE_TAKEN: [
            {
              target: "victory",
              cond: (context) => context.enemy_pokemon.currentHp < 1,
            },
            {
              target: "their_turn",
            },
          ],
        },
      },
      player_damage_step: {
        on: {
          DAMAGE_TAKEN: [
            {
              target: "feint",
              cond: (context) => context.selected_pokemon.currentHp < 1,
            },
            {
              target: "your_turn",
            },
          ],
        },
      },
      feint: {
        on: {
          SELECT_NEXT_POKEMON: [
            {
              target: "whited_out",
              cond: (context) => context.available_pokemon.length < 1,
            },
            {
              target: "pokemon",
            },
          ],
        },
      },
      victory: { type: "final" },
      whited_out: { type: "final" },
    },
  }
  // {
  //   actions: {
  //     assignName: () =>
  //       assign({
  //         name: (context, event: Context) => event.name,
  //       }),
  //   },
  // }
);

export enum States {
  PENDING = "pending",
  SUCCESS = "success",
  FAILURE = "failure",
}

// const smilesService = interpret(smilesMachine);

export interface SmilesData {
  data: {
    smiles: number;
  };
}

// export const useFiniteState = (): [state: any, smiles: number] => {
//   const [state, send] = useMachine(smilesMachine);
//   const [smiles, setSmiles] = useState(0);

//   smilesService.start();

//   useEffect(() => {
//     const fetchData = async () => {
//       send("PENDING");
//       try {
//         const result: () => Promise<SmilesData> = () =>
//           new Promise((res) =>
//             setTimeout(() => res({ data: { smiles: 1 } }), 3000)
//           );
//         const {
//           data: { smiles: smileCount },
//         } = await result();

//         setSmiles(smileCount);
//         send("RESOLVED");
//       } catch (error) {
//         send("REJECTED");
//       }
//     };
//     fetchData();
//   }, []);

//   return [state, smiles];
// };
