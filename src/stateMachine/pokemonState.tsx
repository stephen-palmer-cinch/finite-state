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
  player_dialogue: "What will Pikachu do?",
  enemy_dialogue: "A wild Pidgey appeared",
};

export const pokemonBattleMachine = createMachine(
  {
    id: "pokemonState",
    initial: "battle",
    predictableActionArguments: true,
    schema: {
      context: {} as PokemonContext,
      events: {} as GameEvents,
    },
    context: initialContext,
    states: {
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
        after: {
          1000: { actions: "enemyDamagesPlayer", target: "player_damage_step" },
        },
      },
      moves: {
        on: {
          MOVE_SELECTED: {
            target: "enemy_damage_step",
            actions: "playerDamagesEnemy",
            internal: true,
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
        on: {
          SUCCESS: { target: "victory" },
          FAILURE: { target: "their_turn" },
        },
      },
      catching: {
        on: {
          SUCCESS: { target: "victory" },
          FAILURE: { target: "their_turn" },
        },
      },
      enemy_damage_step: {
        after: {
          1000: [
            {
              target: "victory",
              cond: (context) => context.enemy_pokemon.currentHp < 1,
              internal: true,
            },
            {
              target: "their_turn",
              internal: true,
            },
          ],
        },
      },
      player_damage_step: {
        after: {
          1000: [
            {
              target: "feint",
              cond: (context) => context.selected_pokemon.currentHp < 1,
            },
            {
              actions: "playerMessage",
              target: "your_turn",
            },
          ],
        },
      },
      feint: {
        always: [
          {
            target: "whited_out",
            cond: (context) =>
              context.available_pokemon.every(
                (pokemon) => pokemon.currentHp < 1
              ),
          },
          {
            target: "pokemon",
          },
        ],
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
          player_dialogue: `Go ${selectedPokemon.name}!`,
        };
      }),
      playerDamagesEnemy: assign((context, event: any) => {
        const currentPokemon: Pokemon = context.selected_pokemon;
        const enemyPokemon: Pokemon = context.enemy_pokemon;
        const selectedMove = currentPokemon.moves[event.payload];
        let enemyPokemonHp = enemyPokemon.currentHp - selectedMove.damage;
        if (enemyPokemonHp < 0) enemyPokemonHp = 0;
        return {
          enemy_pokemon: { ...enemyPokemon, currentHp: enemyPokemonHp },
          player_dialogue: `${currentPokemon.name} used ${selectedMove.name}`,
        };
      }),
      enemyDamagesPlayer: assign((context) => {
        const currentPokemon: Pokemon = context.selected_pokemon;
        const enemyPokemon: Pokemon = context.enemy_pokemon;
        const selectedMovePosition = Math.floor(
          Math.random() * enemyPokemon.moves.length
        );
        const selectedMove = enemyPokemon.moves[selectedMovePosition];
        let currentPokemonHp = currentPokemon.currentHp - selectedMove.damage;
        if (currentPokemonHp < 0) currentPokemonHp = 0;
        return {
          selected_pokemon: { ...currentPokemon, currentHp: currentPokemonHp },
          player_dialogue: `${enemyPokemon.name} used ${selectedMove.name}`,
        };
      }),
      playerMessage: assign((context) => {
        const currentPokemon: Pokemon = context.selected_pokemon;
        const currentPokemonHp = currentPokemon.currentHp;
        const message =
          currentPokemonHp < 1
            ? `${currentPokemon.name} fainted?`
            : `What should ${currentPokemon.name} do?`;
        return {
          player_dialogue: message,
        };
      }),
    },
  }
);
