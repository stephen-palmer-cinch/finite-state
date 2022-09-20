import { assign, createMachine } from "xstate";
import {
  PokemonContext,
  GameEvents,
  pidgey,
  pikachu,
  charmander,
  Pokemon,
} from "./types";

const initialContext = {
  selected_pokemon: pikachu,
  available_pokemon: [charmander],
  enemy_pokemon: pidgey,
};

export const pokemonBattleMachine = createMachine(
  {
    id: "smilesState",
    initial: "idle",
    predictableActionArguments: true,
    schema: {
      context: {} as PokemonContext,
      events: {} as GameEvents,
    },
    context: initialContext,
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
          ENEMY_ATTACK: {
            target: "player_damage_step",
            actions: "playerDamage",
          },
        },
      },
      moves: {
        on: {
          MOVE_SELECTED: {
            target: "enemy_damage_step",
            actions: "enemyDamage",
          },
          CANCEL: { target: "your_turn" },
        },
      },
      items: {
        on: {
          POKE_BALL: { target: "catching" },
          CANCEL: { target: "your_turn" },
        },
      },
      pokemon: {
        on: {
          POKEMON_SELECTED: { actions: "switchPokemon", target: "their_turn" },
          CANCEL: [
            {
              cond: (context) => context.selected_pokemon.currentHp > 0,
              target: "your_turn",
            },
          ],
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
  },
  {
    actions: {
      switchPokemon: assign((context, event: any) => {
        const currentPokemon: Pokemon = context.selected_pokemon;
        const selectedPokemon = context.available_pokemon[event.payload];
        const benchPokemon = context.available_pokemon.filter(
          (pokemon) => pokemon !== selectedPokemon
        );
        return {
          available_pokemon: [...benchPokemon, currentPokemon],
          selected_pokemon: selectedPokemon,
        };
      }),
      playerDamage: assign((context, event: any) => {
        const currentPokemon: Pokemon = context.selected_pokemon;
        const selectedMove = currentPokemon.moves[event.payload];
        const currentPokemonHp = currentPokemon.currentHp - selectedMove.damage;
        return {
          selected_pokemon: { ...currentPokemon, currentHp: currentPokemonHp },
        };
      }),
      enemyDamage: assign((context, event: any) => {
        const enemyPokemon: Pokemon = context.enemy_pokemon;
        const selectedMove = enemyPokemon.moves[event.payload];
        const enemyPokemonHp = enemyPokemon.currentHp - selectedMove.damage;
        return {
          enemy_pokemon: { ...enemyPokemon, currentHp: enemyPokemonHp },
        };
      }),
    },
  }
);
